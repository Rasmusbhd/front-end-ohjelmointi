import React, { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';

export default function EditCar(props) {
    const [open, setOpen] = useState(false);
    const [car, setCar] = useState({
        brand: '',
        model: '',
        color: '',
        fuel: '',
        modelYear: '',
        price: ''
    });

    const handleClickOpen = () => {
        setCar({brand: props.car.brand, model: props.car.model, color: props.car.color,
            fuel: props.car.fuel, modelYear: props.car.modelYear, price: props.car.price})
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleInputChange = (event) => {
        setCar({ ...car, [event.target.name]: event.target.value });
    };

    const updateCar = () => {
        props.updateCar(car, props.car._links.car.href);
        setOpen(false);
    };

    return (
        <div>
            <Button variant="outlined" color="primary" onClick={handleClickOpen}>
                Edit
            </Button>
            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Edit Car</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        name="brand"
                        value={car.brand}
                        onChange={handleInputChange}
                        label="Brand"
                        fullWidth
                    />
                    <TextField
                        autoFocus
                        margin="dense"
                        name="model"
                        value={car.model}
                        onChange={handleInputChange}
                        label="Model"
                        fullWidth
                    />
                    <TextField
                        autoFocus
                        margin="dense"
                        name="color"
                        value={car.color}
                        onChange={handleInputChange}
                        label="Color"
                        fullWidth
                    />
                    <TextField
                        autoFocus
                        margin="dense"
                        name="fuel"
                        value={car.fuel}
                        onChange={handleInputChange}
                        label="Fuel"
                        fullWidth
                    />
                    <TextField
                        autoFocus
                        margin="dense"
                        name="modelYear"
                        value={car.modelYear}
                        onChange={handleInputChange}
                        label="ModelYear"
                        fullWidth
                    />
                    <TextField
                        autoFocus
                        margin="dense"
                        name="price"
                        value={car.price}
                        onChange={handleInputChange}
                        label="Price"
                        fullWidth
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={updateCar} color="primary">
                        Save
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}