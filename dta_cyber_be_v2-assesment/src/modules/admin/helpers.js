const {Quiz, QuizGroup, QuizQuestion, QuizOption} = require("../assessment/models");
const {getInstanceOrException} = require("../common/validators");
const {dbClient} = require("../../config");
// const fileType  = require("file-type");
const sequelize = dbClient;

const getProperType = (field) => {
    let typeToReturn = field.type.constructor.name;

    if (field?.validate?.isIn || field?.references?.model) {
        return "select"
    }
    switch (field.type.constructor.name) {
        case "STRING":
            typeToReturn = "text"
            break;
        case "TEXT":
            typeToReturn = "text"
            break;
        case "INTEGER":
            typeToReturn = "number"
            break;
        case "DATE":
            typeToReturn = "date"
            break;
        case "BLOB":
            typeToReturn = "file"
            break;

        default:
            break;
    }
    return typeToReturn;
};

const getProperModel = (model) => {
    if (model == "Quizzes") {
        return "Quiz"
    } else if (model == "QuizGroups") {
        return "QuizGroup"
    } else if (model == "QuizOptions") {
        return "QuizOption"
    } else if (model == "Questions") {
        return "QuizQuestion"
    } else {
        return model
    }
};

const getModelFromString = (strModel) => {
    const customStrModel = strModel.charAt(0).toUpperCase() + strModel.slice(1);
    return sequelize.models[getProperModel(customStrModel)]
};

const getProperSelectOptions = async (field) => {
    let dataToReturn = "";
    try {
        if (field.validate?.isIn?.[0]) {
            let arr = await field.validate.isIn[0]?.map((data) => {
                return {
                    value: data,
                    label: data[0].toUpperCase() + data.slice(1),
                };
            });
            dataToReturn = arr;

        } else if (field?.references?.model) {
            const fetchedData = await getModelFromString(field?.references?.model).findAll();
            dataToReturn = fetchedData.map((f) => {
                return {
                    "value": f.dataValues.id,
                    "label": f.dataValues.title,
                    "label_jp": f.dataValues.title_jp,
                }
            })
        } else {
            dataToReturn = null;
        }
        return dataToReturn;
    } catch (error) {
        console.log("error", error)
    }
};


const getUpdateMeta = async (model, pk) => {
    const fetchedData = await getInstanceOrException(model, pk);
    const modelSchema = await getModelSchema(model);
    modelSchema.map((obj) => {
        if(['ref_image', 'correct_image', 'wrong_image',].includes(obj.name)){
            // const mime = fileType(fetchedData[obj.name])
            // console.log("aabb", fetchedData[obj.name])
            // const base64 =  fetchedData[obj.name]?.toString('base64')
            // obj.value = `data:${"image/png"};base64, ${base64}` ;    
            obj.value = fetchedData[obj.name];
        }else{
            obj.value = fetchedData[obj.name];
        }
    })
    console.log("modelSchema", modelSchema);
    return modelSchema;
}


const getModelSchema = async (model) => {
    const fields = await Promise.all(Object.keys(model.getAttributes()).map(async key => {

        const field = model.getAttributes()[key];
        return {
            name: key,
            type: getProperType(field),
            label: getDisplay(field.field),
            // required: field.allowNull ? false : true,
            // required: true,
            options: await getProperSelectOptions(field),
            value: null,
        };
    }))


    return fields.filter(_field => ![
        'id',
        'created_at',
        'updated_at',
    ].includes(_field.name));
}

const getDisplay = (data) => data.replace(/_/g, ' ').replace(/\b\w/g, c => c.toUpperCase())?.replace('Id', '');

const getListingData = async (model) => {

    const modelSchema = await getModelSchema(model);

    const metaFields = {}

    const filteredData = modelSchema.filter(_field => ![
            'ref_image',
            'correct_image',
            'wrong_image',
    ].includes(_field.name));

    return filteredData
}

const getForeignValueData = async (model) => {
    switch (model) {
        case QuizGroup:
            return [
                {
                    model: Quiz,
                    as: "quiz",
                    attributes: ["title"],
                },
            ];
        case QuizQuestion:
            return [
                {
                    model: QuizGroup,
                    as: "group",
                    attributes: ["title"],
                },
                {
                    model: QuizOption,
                    as: "single_option_valid_option",
                    attributes: ["title"],
                },
            ];

        default:
            break;
    }
};

const getForeignValue = async(model) =>{

    const includeArr = await getForeignValueData(model);

        const data = await model.findAll({
          include: includeArr,
          raw: true,
          nest: true,
        });


        const updatedData = await data.map(async item => {
            const currData = await  item;
            includeArr?.map((obj)=> {
                currData[`${obj.as}_id`] = item[obj.as]?.title
            });
          });
      
        return data;
      };


module.exports = {
    getModelSchema,
    getUpdateMeta,
    getListingData,
    getProperModel,
    getModelFromString,
    getForeignValue,
}
