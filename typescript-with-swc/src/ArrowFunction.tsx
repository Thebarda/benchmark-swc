import * as React from "react";
import { Button, Typography, Table, TableHead, TableRow, TableContainer, Paper, TableCell, TableBody, ThemeProvider, createTheme } from "@mui/material";
import { useAtom } from "jotai";
import { clickedAtom } from "./atoms";
import rows from "./data";

export const ArrowFunction = () => {
    const [clicked, setClicked] = useAtom(clickedAtom);
    const timeoutRef = React.useRef<NodeJS.Timeout | undefined>();

    const click = () => setClicked(true);

    React.useEffect(() => {
        if (!clicked) {
            return;
        }

        if (timeoutRef.current) {
            clearInterval(timeoutRef.current);
        }

        timeoutRef.current = setTimeout(() => {
            setClicked(false);
        }, 1000)
    }, [clicked]);

    return (
        <ThemeProvider theme={createTheme({
            palette: {
            mode: 'dark',
            },
        })}>
        <Paper>
            <Typography variant="h4">{clicked ? 'You\'ve clicked' : 'coucou'}</Typography>
            <Button variant="contained" onClick={click}>Click me</Button>
            <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
            <TableRow>
                <TableCell>Dessert (100g serving)</TableCell>
                <TableCell align="right">Calories</TableCell>
                <TableCell align="right">Fat&nbsp;(g)</TableCell>
                <TableCell align="right">Carbs&nbsp;(g)</TableCell>
                <TableCell align="right">Protein&nbsp;(g)</TableCell>
            </TableRow>
            </TableHead>
            <TableBody>
            {rows.map((row) => (
                <TableRow
                key={row.name}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                <TableCell component="th" scope="row">
                    {row.name}
                </TableCell>
                <TableCell align="right">{row.calories}</TableCell>
                <TableCell align="right">{row.fat}</TableCell>
                <TableCell align="right">{row.carbs}</TableCell>
                <TableCell align="right">{row.protein}</TableCell>
                </TableRow>
            ))}
            </TableBody>
        </Table>
        </TableContainer>
        </Paper>
        </ThemeProvider>
    )
};
