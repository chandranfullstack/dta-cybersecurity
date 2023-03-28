import React from "react"
import { Box, Button ,Link } from "@admin-bro/design-system";
import { layout, LayoutProps } from 'styled-system'

import {
    Table,
    TableRow,
    TableCell,
    TableCaption,
    TableHead,
    TableBody,
  } from '@admin-bro/design-system'

const Download=()=>{
    
    return(
        <>
        <Box  flex justifyItems={"flex-end"} bg="white" paddingLeft="1029px">
            <Button>
                <Link href="/download-excel">
                Export to excel
                </Link>
            </Button>
        </Box>
        <Box bg="white" pt="4px" alignContent="center" justifyContent="center">
            <Table border="1px black solid">
                <TableHead>
                    <TableRow>
                        <TableCell>Tilte</TableCell>
                        <TableCell>id</TableCell>
                        <TableCell>Wrong answer</TableCell>
                        <TableCell>Correct Answer</TableCell>
                        <TableCell>Username</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    <TableRow>
                        <TableCell>Hash Key</TableCell>
                        <TableCell>1</TableCell>
                        <TableCell>5</TableCell>
                        <TableCell>5</TableCell>
                        <TableCell>Chandran</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>Phishing attack</TableCell>
                        <TableCell>2</TableCell>
                        <TableCell>5</TableCell>
                        <TableCell>6</TableCell>
                        <TableCell>ravichandran</TableCell>
                    </TableRow>
                </TableBody>
            </Table>
            </Box>
            </>
    )
   
}
export default Download