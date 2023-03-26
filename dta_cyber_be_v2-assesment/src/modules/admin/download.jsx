import React from "react"
import { Box, Button } from "@admin-bro/design-system"

const Download=()=>{
  const  handleExport=()=>{
    console.log("called the function")
        const data = [
            ['Name', 'Age', 'Country'],
            ['Alice', 28, 'USA'],
            ['Bob', 35, 'Canada'],
            ['Charlie', 42, 'UK'],
          ];
         window.print()
          
          
    }
    return(
        <Box>
            <Button onClick={handleExport}>
                Export to excel
            </Button>
            </Box>
    )
}
export default Download