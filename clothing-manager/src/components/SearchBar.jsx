import { TextField, MenuItem } from "@mui/material";
import { useEffect, useState } from "react";

export default function SearchBar({ products, categories, onSearch }) {
    const [name, setName] = useState("");
    const [categoryId, setCategoryId] = useState("");

    useEffect(() => {
        let result = products.filter(p =>
            p.name.toLowerCase().includes(name.toLowerCase())
        );

        if (categoryId) {
            result = result.filter(p => p.categoryId === +categoryId);
        }

        onSearch(result);
    }, [name, categoryId, products, onSearch]);

    return (
        <>
            <TextField
                label="Tên sản phẩm"
                value={name}
                onChange={e => setName(e.target.value)}
                sx={{ mr: 2 }}
            />

            <TextField
                select
                label="Loại"
                value={categoryId}
                onChange={e => setCategoryId(e.target.value)}
                sx={{ width: 200 }}
            >
                <MenuItem value="">Tất cả</MenuItem>
                {categories.map(c => (
                    <MenuItem key={c.id} value={c.id}>
                        {c.name}
                    </MenuItem>
                ))}
            </TextField>
        </>
    );
}
