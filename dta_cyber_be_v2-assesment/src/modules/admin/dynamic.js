const {apiOkResponse, apiErrorResponse,} = require("../common/helpers");
const {getInstanceOrException} = require("../common/validators");
const {Quiz} = require("../assessment/models");
const {configController} = require("./controllers");
const {getModelSchema, getUpdateMeta, getListingData, getForeignValue, getModelFromString} = require("./helpers");
const fs = require('fs');
const base64js = require('base64-js');


/**
 * Generate the dynamic CRUD logic for the admin models.
 * This is a factory class used for the dynamic admin.
 */
class AdminDynamicCRUDFactory {

    constructor(model) {
        this.model = model
    }

    fetchAllController = async (req, res, next) => {
        try {
            const resData = await getForeignValue(this.model);
            // console.log("fetchAll", resData)
           
            apiOkResponse(res, resData)
        } catch (e) {
            next(e);
        }
    };

    insertController = async (req, res, next) => {
        try {

            console.log("whole", {...req.body});



            const quizData = await this.model.create({...req.body})

            apiOkResponse(res, {});
        } catch (e) {
            next(e);
        }

    };

    fetchOneController = async (req, res, next) => {
        try {
            const instance = await getInstanceOrException(this.model, req.params.id)
            apiOkResponse(res, instance);
        } catch (e) {
            next(e);
        }
    };

    updateController = async (req, res, next) => {
        try {
            const instance = await getInstanceOrException(this.model, req.params.id)
            const updatedInstance = await this.model.update({
                    ...req.body
                },
                {
                    where: {
                        id: instance.id,
                    }
                })
            apiOkResponse(res, instance);
        } catch (e) {
            next(e);
        }
    };

    deleteController = async (req, res, next) => {
        try {
            const instance = await getInstanceOrException(this.model, req.params.id)
            await this.model.destroy({
                where: {
                    id: instance.id,
                }
            })
            apiOkResponse(res);
        } catch (e) {
            next(e);
        }

    };

    fetchMetaForInsertController = async (req, res, next) => {
        try {
            apiOkResponse(res, {
                form_meta: await getModelSchema(this.model)
            })
        } catch (e) {
            next(e);
        }
    };

    fetchMetaForUpdateController = async (req, res, next) => {
        try {
            apiOkResponse(res, {
                form_meta: await getUpdateMeta(this.model, req.params.id)
            })
        } catch (e) {
            next(e);
        }
    };

    fetchMetaForAllController = async (req, res, next) => {
        try {
            apiOkResponse(res, {
                table_meta: await getListingData(this.model)
            })
        } catch (e) {
            next(e);
        }
    };

    registerRoutes = (router, prefix) => {
        router.route(`${prefix}/new/`).post(this.insertController);
        router.route(`${prefix}/new/meta/`).get(this.fetchMetaForInsertController);

        router.route(`${prefix}/all/`).get(this.fetchAllController);
        router.route(`${prefix}/all/meta/`).get(this.fetchMetaForAllController);

        router.route(`${prefix}/:id/view/`).get(this.fetchOneController);
        router.route(`${prefix}/:id/delete/`).delete(this.deleteController);

        router.route(`${prefix}/:id/update/`).put(this.updateController);
        router.route(`${prefix}/:id/update/meta/`).get(this.fetchMetaForUpdateController);
    }

}

module.exports = AdminDynamicCRUDFactory;
