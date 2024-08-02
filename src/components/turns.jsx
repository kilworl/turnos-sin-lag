// import React, { useState, useEffect, useCallback } from 'react';
// import Table from '@mui/material/Table';
// import TableBody from '@mui/material/TableBody';
// import TableCell from '@mui/material/TableCell';
// import TableContainer from '@mui/material/TableContainer';
// import TableHead from '@mui/material/TableHead';
// import TableRow from '@mui/material/TableRow';
// import Paper from '@mui/material/Paper';
// import Select from '@mui/material/Select';
// import MenuItem from '@mui/material/MenuItem';
// import Button from '@mui/material/Button';
// import TextField from '@mui/material/TextField';
// import { Box } from '@mui/material';
// // import { turnEdit, turnList } from './configCtrls';
// import { DateTime } from 'luxon';
// import axios from 'axios';

// const EditTurnsScreen = () => {
//     const [editedTurns, setEditedTurns] = useState([]);
//     const [selectedTurn, setSelectedTurn] = useState(null);
//     const [originalTurns, setOriginalTurns] = useState([]);

//     // useEffect(() => {
//     //     const fetchTurns = async () => {
//     //         try {
//     //             // const response = await turnList();
//     //             const turnsWithEditingFlag = response.data.map(turn => ({ ...turn, editing: false }));
//     //             setEditedTurns(turnsWithEditingFlag);
//     //             setOriginalTurns(response.data);
//     //         } catch (error) {
//     //             console.error('Error fetching turns:', error);
//     //         }
//     //     };
//     //     fetchTurns();
//     // }, []);

//     const handleEditTurn = useCallback((id) => {
//         setEditedTurns(prevTurns => 
//             prevTurns.map(turn => turn._id === id 
//                 ? { ...turn, editing: true } 
//                 : { ...turn, editing: false }
//             )
//         );
//         setSelectedTurn(id);
//     }, []);

//     const handleSaveChanges = useCallback(async () => {
//         try {
//             const editedTurn = editedTurns.find(turn => turn._id === selectedTurn);
//             editedTurn.start = DateTime.fromISO(editedTurn.start, { zone: "utc" }).set({ minute: "00" }).toISO();
//             editedTurn.end = DateTime.fromISO(editedTurn.end, { zone: "utc" }).set({ minute: "00" }).toISO();
//             const response = await axios.put(`http://localhost:3001/api/turns/${selectedTurn}`, editedTurn);

//             setOriginalTurns(prevOriginalTurns => 
//                 prevOriginalTurns.map(turn =>
//                     turn._id === selectedTurn ? response.data : turn
//                 )
//             );
//             handleCancelEdit();
//         } catch (error) {
//             console.error('Error updating turn:', error);
//         }
//     }, [editedTurns, selectedTurn]);

//     const handleCancelEdit = useCallback(() => {
//         setEditedTurns(prevTurns => 
//             prevTurns.map(turn => turn._id === selectedTurn 
//                 ? { ...turn, editing: false } 
//                 : turn
//             )
//         );
//     }, [selectedTurn]);

//     const handleUndoChanges = useCallback(() => {
//         setEditedTurns(originalTurns.map(turn => ({ ...turn, editing: false })));
//     }, [originalTurns]);

//     const handleChange = useCallback((event) => {
//         const { name, value } = event.target;
//         setEditedTurns(prevTurns => 
//             prevTurns.map(turn => {
//                 if (turn._id === selectedTurn) {
//                     if (name === 'start' || name === 'end') {
//                         let newValue = value;
//                         const index = originalTurns.findIndex(turn => turn._id === selectedTurn);
//                         if (index > 0 && name === 'start') {
//                             const previousEndTime = new Date(originalTurns[index - 1].end);
//                             const selectedStartTime = new Date(newValue);
//                             if (selectedStartTime <= previousEndTime) {
//                                 selectedStartTime.setTime(previousEndTime.getTime() + 60000);
//                                 newValue = selectedStartTime.toISOString().slice(0, 16);
//                             }
//                         } else if (index < originalTurns.length - 1 && name === 'end') {
//                             const nextStartTime = new Date(originalTurns[index + 1].start);
//                             const selectedEndTime = new Date(newValue);
//                             if (selectedEndTime >= nextStartTime) {
//                                 selectedEndTime.setTime(nextStartTime.getTime() - 60000);
//                                 newValue = selectedEndTime.toISOString().slice(0, 16);
//                             }
//                         }
//                         return { ...turn, [name]: newValue };
//                     }
//                     return { ...turn, [name]: value };
//                 }
//                 return turn;
//             })
//         );
//     }, [originalTurns, selectedTurn]);

//     return (
//         <div>
//             <h1 style={{ fontWeight: 'bold' }}>Editar Turnos</h1>
//             <Button onClick={handleUndoChanges} variant="outlined" style={{ marginBottom: '10px' }}>Deshacer</Button>
//             <TableContainer component={Paper} elevation={3} sx={{ maxHeight: 400 }}>
//                 <Table stickyHeader>
//                     <TableHead>
//                         <TableRow>
//                             <TableCell style={{ backgroundColor: '#F5F5F5', fontWeight: 'bold' }}>Nombre</TableCell>
//                             <TableCell style={{ backgroundColor: '#F5F5F5', fontWeight: 'bold' }}>Hora de Inicio</TableCell>
//                             <TableCell style={{ backgroundColor: '#F5F5F5', fontWeight: 'bold' }}>Hora de Fin</TableCell>
//                             <TableCell style={{ backgroundColor: '#F5F5F5', fontWeight: 'bold' }}>Accion</TableCell>
//                         </TableRow>
//                     </TableHead>
//                     <TableBody>
//                         {editedTurns.map(turn => (
//                             <TableRow key={turn._id}>
//                                 <TableCell>
//                                     {turn.editing ? (
//                                         <Select
//                                             name="name"
//                                             value={turn.name}
//                                             onChange={handleChange}
//                                         >
//                                             <MenuItem value="1">1</MenuItem>
//                                             <MenuItem value="2">2</MenuItem>
//                                             <MenuItem value="3">3</MenuItem>
//                                             <MenuItem value="Sin turno">Sin turno</MenuItem>
//                                         </Select>
//                                     ) : (
//                                         turn.name
//                                     )}
//                                 </TableCell>
//                                 <TableCell>
//                                     {turn.editing ? (
//                                         <TextField
//                                             name="start"
//                                             type="datetime-local"
//                                             value={turn.start}
//                                             onChange={handleChange}
//                                         />
//                                     ) : (
//                                         DateTime.fromISO(turn.start, { zone: "utc"}).toLocaleString(DateTime.DATETIME_SHORT) + " Hr"
//                                     )}
//                                 </TableCell>
//                                 <TableCell>
//                                     {turn.editing ? (
//                                         <TextField
//                                             name="end"
//                                             type="datetime-local"
//                                             value={turn.end}
//                                             onChange={handleChange}
//                                         />
//                                     ) : (
//                                         DateTime.fromISO(turn.end, { zone: "utc"}).toLocaleString(DateTime.DATETIME_SHORT) + " Hr"
//                                     )}
//                                 </TableCell>
//                                 <TableCell>
//                                     {!turn.editing ? (
//                                         <Button onClick={() => handleEditTurn(turn._id)} variant="outlined">Editar</Button>
//                                     ) : (
//                                         <Box sx={{ display: 'flex', justifyContent: 'space-between', marginTop: 2 }}>
//                                             <Button onClick={handleCancelEdit} variant="outlined" sx={{ width: '45%', fontSize: 'small' }}>Cancelar</Button>
//                                             <Button onClick={handleSaveChanges} variant="contained" sx={{ width: '45%', fontSize: 'small' }}>Guardar</Button>
//                                         </Box>
//                                     )}
//                                 </TableCell>
//                             </TableRow>
//                         ))}
//                     </TableBody>
//                 </Table>
//             </TableContainer>
//         </div>
//     );
// };

// export default EditTurnsScreen;



import React, { useState, useEffect, useCallback } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { Box } from '@mui/material';
import { DateTime } from 'luxon';
import axios from 'axios';

const EditTurnsScreen = () => {
    const initialTurns = [
        {
            _id: '1',
            name: '1',
            start: DateTime.now().minus({ hours: 1 }).toISO(),
            end: DateTime.now().toISO(),
            editing: false
        },
        {
            _id: '2',
            name: '2',
            start: DateTime.now().toISO(),
            end: DateTime.now().plus({ hours: 1 }).toISO(),
            editing: false
        }
    ];

    const [editedTurns, setEditedTurns] = useState(initialTurns);
    const [selectedTurn, setSelectedTurn] = useState(null);
    const [originalTurns, setOriginalTurns] = useState(initialTurns);

    // useEffect(() => {
    //     const fetchTurns = async () => {
    //         try {
    //             // const response = await turnList();
    //             const turnsWithEditingFlag = response.data.map(turn => ({ ...turn, editing: false }));
    //             setEditedTurns(turnsWithEditingFlag);
    //             setOriginalTurns(response.data);
    //         } catch (error) {
    //             console.error('Error fetching turns:', error);
    //         }
    //     };
    //     fetchTurns();
    // }, []);

    const handleEditTurn = useCallback((id) => {
        setEditedTurns(prevTurns => 
            prevTurns.map(turn => turn._id === id 
                ? { ...turn, editing: true } 
                : { ...turn, editing: false }
            )
        );
        setSelectedTurn(id);
    }, []);

    const handleSaveChanges = useCallback(async () => {
        try {
            const editedTurn = editedTurns.find(turn => turn._id === selectedTurn);
            editedTurn.start = DateTime.fromISO(editedTurn.start, { zone: "utc" }).set({ minute: "00" }).toISO();
            editedTurn.end = DateTime.fromISO(editedTurn.end, { zone: "utc" }).set({ minute: "00" }).toISO();
            const response = await axios.put(`http://localhost:3001/api/turns/${selectedTurn}`, editedTurn);

            setOriginalTurns(prevOriginalTurns => 
                prevOriginalTurns.map(turn =>
                    turn._id === selectedTurn ? response.data : turn
                )
            );
            handleCancelEdit();
        } catch (error) {
            console.error('Error updating turn:', error);
        }
    }, [editedTurns, selectedTurn]);

    const handleCancelEdit = useCallback(() => {
        setEditedTurns(prevTurns => 
            prevTurns.map(turn => turn._id === selectedTurn 
                ? { ...turn, editing: false } 
                : turn
            )
        );
    }, [selectedTurn]);

    const handleUndoChanges = useCallback(() => {
        setEditedTurns(originalTurns.map(turn => ({ ...turn, editing: false })));
    }, [originalTurns]);

    const handleChange = useCallback((event) => {
        const { name, value } = event.target;
        setEditedTurns(prevTurns => 
            prevTurns.map(turn => {
                if (turn._id === selectedTurn) {
                    if (name === 'start' || name === 'end') {
                        let newValue = value;
                        const index = originalTurns.findIndex(turn => turn._id === selectedTurn);
                        if (index > 0 && name === 'start') {
                            const previousEndTime = new Date(originalTurns[index - 1].end);
                            const selectedStartTime = new Date(newValue);
                            if (selectedStartTime <= previousEndTime) {
                                selectedStartTime.setTime(previousEndTime.getTime() + 60000);
                                newValue = selectedStartTime.toISOString().slice(0, 16);
                            }
                        } else if (index < originalTurns.length - 1 && name === 'end') {
                            const nextStartTime = new Date(originalTurns[index + 1].start);
                            const selectedEndTime = new Date(newValue);
                            if (selectedEndTime >= nextStartTime) {
                                selectedEndTime.setTime(nextStartTime.getTime() - 60000);
                                newValue = selectedEndTime.toISOString().slice(0, 16);
                            }
                        }
                        return { ...turn, [name]: newValue };
                    }
                    return { ...turn, [name]: value };
                }
                return turn;
            })
        );
    }, [originalTurns, selectedTurn]);

    return (
        <div>
            <h1 style={{ fontWeight: 'bold' }}>Editar Turnos</h1>
            <Button onClick={handleUndoChanges} variant="outlined" style={{ marginBottom: '10px' }}>Deshacer</Button>
            <TableContainer component={Paper} elevation={3} sx={{ maxHeight: 400 }}>
                <Table stickyHeader>
                    <TableHead>
                        <TableRow>
                            <TableCell style={{ backgroundColor: '#F5F5F5', fontWeight: 'bold' }}>Nombre</TableCell>
                            <TableCell style={{ backgroundColor: '#F5F5F5', fontWeight: 'bold' }}>Hora de Inicio</TableCell>
                            <TableCell style={{ backgroundColor: '#F5F5F5', fontWeight: 'bold' }}>Hora de Fin</TableCell>
                            <TableCell style={{ backgroundColor: '#F5F5F5', fontWeight: 'bold' }}>Accion</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {editedTurns.map(turn => (
                            <TableRow key={turn._id}>
                                <TableCell>
                                    {turn.editing ? (
                                        <Select
                                            name="name"
                                            value={turn.name}
                                            onChange={handleChange}
                                        >
                                            <MenuItem value="1">1</MenuItem>
                                            <MenuItem value="2">2</MenuItem>
                                            <MenuItem value="3">3</MenuItem>
                                            <MenuItem value="Sin turno">Sin turno</MenuItem>
                                        </Select>
                                    ) : (
                                        turn.name
                                    )}
                                </TableCell>
                                <TableCell>
                                    {turn.editing ? (
                                        <TextField
                                            name="start"
                                            type="datetime-local"
                                            value={turn.start}
                                            onChange={handleChange}
                                        />
                                    ) : (
                                        DateTime.fromISO(turn.start, { zone: "utc"}).toLocaleString(DateTime.DATETIME_SHORT) + " Hr"
                                    )}
                                </TableCell>
                                <TableCell>
                                    {turn.editing ? (
                                        <TextField
                                            name="end"
                                            type="datetime-local"
                                            value={turn.end}
                                            onChange={handleChange}
                                        />
                                    ) : (
                                        DateTime.fromISO(turn.end, { zone: "utc"}).toLocaleString(DateTime.DATETIME_SHORT) + " Hr"
                                    )}
                                </TableCell>
                                <TableCell>
                                    {!turn.editing ? (
                                        <Button onClick={() => handleEditTurn(turn._id)} variant="outlined">Editar</Button>
                                    ) : (
                                        <Box sx={{ display: 'flex', justifyContent: 'space-between', marginTop: 2 }}>
                                            <Button onClick={handleCancelEdit} variant="outlined" sx={{ width: '45%', fontSize: 'small' }}>Cancelar</Button>
                                            <Button onClick={handleSaveChanges} variant="contained" sx={{ width: '45%', fontSize: 'small' }}>Guardar</Button>
                                        </Box>
                                    )}
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
};

export default EditTurnsScreen;
