
import React, { useState } from 'react';
import {
  Container,
  Button,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Grid,
  Box,
} from '@mui/material';

const JobList = () => {
  const [showForm, setShowForm] = useState(false);
  const [jobs, setJobs] = useState([
    { name: 'Job genérico', partsPerMinute: 8.983, cycleTime: 0.111, stopInterval: '00:01:30', microStopInterval: '00:00:20', equipment: 'Impregnadora D1' },
    // Añade más jobs según sea necesario
  ]);

  const handleFormSubmit = (event) => {
    event.preventDefault();
    const newJob = {
      name: event.target.jobName.value,
      partsPerMinute: event.target.partsPerMinute.value,
      cycleTime: event.target.cycleTime.value,
      stopInterval: event.target.stopInterval.value,
      microStopInterval: event.target.microStopInterval.value,
      equipment: event.target.equipment.value,
    };
    setJobs([...jobs, newJob]);
    setShowForm(false);
  };

  return (
    <Container>
      <h1>Lista de Jobs</h1>
      <Grid container spacing={2} alignItems="center">
        <Grid item xs={4} bgcolor={'white'} p={2}>
          <FormControl fullWidth>
            <InputLabel
              id="equipment-label"
              sx={{
                fontSize: '0.75rem',
                transform: 'translate(14px, 10px) scale(1)',
                '&.MuiInputLabel-shrink': {
                  transform: 'translate(14px, -6px) scale(0.75)',
                },
              }}
            >
              Búsqueda por equipos
            </InputLabel>
            <Select
              labelId="equipment-label"
              id="equipment"
              name="equipment"
              size="small"
              sx={{
                height: '30px',
                '& .MuiInputBase-root': {
                  height: '30px',
                },
                '& .MuiInputLabel-root': {
                  fontSize: '0.1rem',
                },
              }}
            >
              <MenuItem value="Impregnadora D1">Impregnadora D1</MenuItem>
              {/* Añade más equipos aquí */}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={4} bgcolor={'white'} padding={2} m={2}>
          <TextField
            fullWidth
            label="Filtrar por job"
            name="filterJob"
            size="small"
            sx={{
              '& .MuiInputBase-root': {
                height: '30px',
              },
              '& .MuiInputLabel-root': {
                fontSize: '0.75rem',
              },
              '& .MuiInputBase-input': {
                padding: '0 8px',
              },
            }}
          />
        </Grid>

        <Grid item xs={4}>
          <Button variant="contained" color="primary" onClick={() => setShowForm(!showForm)}>
            Añadir Job
          </Button>
        </Grid>
      </Grid>
      <Box display="flex" marginTop={2}>
        {showForm && (
          <Box flex={1} marginRight={2}>
            <form onSubmit={handleFormSubmit}>
              <FormControl fullWidth margin="normal">
                <InputLabel id="equipment-form-label">Equipo</InputLabel>
                <Select labelId="equipment-form-label" id="equipment" name="equipment" required>
                  <MenuItem value="Impregnadora D1">Impregnadora D1</MenuItem>
                  {/* Añade más equipos aquí */}
                </Select>
              </FormControl>
              <TextField fullWidth margin="normal" label="Nombre del Job" name="jobName" required />
              <TextField fullWidth margin="normal" label="Partes Por Minuto" name="partsPerMinute" required />
              <TextField fullWidth margin="normal" label="Tiempo de Ciclo" name="cycleTime" required />
              <TextField fullWidth margin="normal" label="Intervalo de Paradas" name="stopInterval" required />
              <TextField fullWidth margin="normal" label="Intervalo de Microparadas" name="microStopInterval" required />
              <Button type="submit" variant="contained" color="secondary">
                Guardar
              </Button>
            </form>
          </Box>
        )}
        <Box flex={1}>
          <TableContainer component={Paper} sx={{ boxShadow: 3, borderRadius: 2 }}>
            <Table>
              <TableHead>
                <TableRow sx={{ backgroundColor: '#f8f4f4' }}>
                  <TableCell>Nombre de Job</TableCell>
                  <TableCell>Partes Por Minuto</TableCell>
                  <TableCell>Tiempo de Ciclo (min.)</TableCell>
                  <TableCell>Intervalo de Paradas</TableCell>
                  <TableCell>Intervalo de Microparadas</TableCell>
                  <TableCell>Equipo</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {jobs.map((job, index) => (
                  <TableRow
                    key={index}
                    sx={{
                      boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
                      borderRadius: '4px',
                      '&:hover': {
                        boxShadow: '0px 6px 12px rgba(0, 0, 0, 0.15)',
                      },
                    }}
                  >
                    <TableCell>{job.name}</TableCell>
                    <TableCell>{job.partsPerMinute}</TableCell>
                    <TableCell>{job.cycleTime}</TableCell>
                    <TableCell>{job.stopInterval}</TableCell>
                    <TableCell>{job.microStopInterval}</TableCell>
                    <TableCell>{job.equipment}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      </Box>
    </Container>
  );
};

export default JobList;
