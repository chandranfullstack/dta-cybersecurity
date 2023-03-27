import React from "react"
import { Box, Button ,Link } from "@admin-bro/design-system";

const Download=()=>{
  
    return(
        <Box>
            <Button>
                <Link href="/download-excel">
                Export to excel
                </Link>
            </Button>
            </Box>
    )
}
export default Download