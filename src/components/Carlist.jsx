import { useEffect } from "react";
import { useState, useRef } from "react";
import { AgGridReact } from "ag-grid-react";

import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-material.css";
import { autocompleteClasses, Button, Snackbar } from "@mui/material";
import AddCar from "./AddCar";
import EditCar from "./EditCar";

export default function Carlist() {
    const [cars, setCars] = useState([]);
    const gridRef = useRef();
    const [open, setOpen] = useState(false);
    const [msg, setMsg] = useState('');

    useEffect(() => getCars(), []);

    const getCars = () => {
        fetch('https://carrestservice-carshop.rahtiapp.fi/cars')
            .then(response => response.json())
            .then(data => setCars(data._embedded.cars))
            .catch(err => console.error(err))
    }

    const deleteCar = (params) => {
        fetch(params.data._links.car.href, {method: "Delete"})
            .then(response => {
                if (response.ok) {
                    setMsg("The car was deleted successfully!")
                    setOpen(true);
                    getCars();
                } else {
                    window.alert("Something goes wrong with deleting.")
                }
            })
            .catch(error => console.error(error));
    }

    const saveCar = (car) => {
        fetch('https://carrestservice-carshop.rahtiapp.fi/cars', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(car)
        })
        .then(response => {
            if (response.ok) {
                setMsg("The car was saved successfully!")
                setOpen(true);
                getCars();
            } else {
                window.alert("Something goes wrong with saving.")
            }
        })
        .catch(err => console.error(err))
    }
    const updateCar = (car, link) => {
        fetch(link, {
            method: 'PUT',
            headers: {
                'Content-Type' : 'application/json'
            },
            body: JSON.stringify(car)
        })
        .then(response => {
            if (response.ok) {
                setMsg("The car was updated successfully!")
                setOpen(true);
                getCars();
            } else {
                window.alert("Something goes wrong with updating.")
            }
        })
        .catch(err => console.error(err))
    }
    const columns = [
        {field: 'brand', sortable: true, filter: true},
        {field: 'model', sortable: true, filter: true},
        {field: 'color', sortable: true, filter: true},
        {field: 'fuel', sortable: true, filter: true},
        {field: 'modelYear', sortable: true, filter: true},
        {field: 'price', sortable: true, filter: true},
        {cellRenderer: (params) => 
            <EditCar car={params.data} updateCar={updateCar} />
        },
        {cellRenderer: (params) => 
            <Button
                size="small"
                color="error"
                onClick={() => deleteCar(params)}>Delete</Button>
        }
    ];

    return (
        <>
            <AddCar saveCar={saveCar} />
            <div className="ag-theme-material" style={{width: '100%', height: '1000px'}}>
                <AgGridReact
                    ref={gridRef}
                    columnDefs={columns}
                    rowData={cars}
                    pagination={true}
                    paginationPageSize={10}
                />
                <Snackbar
                    open={open}
                    autoHideDuration={3000}
                    onClose={() => setOpen(false)}
                    message={msg}
                />
            </div>
        </>
    );
}