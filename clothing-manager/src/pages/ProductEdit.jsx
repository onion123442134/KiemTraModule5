import {useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import {TextField, Button, MenuItem, Paper, Typography, Stack, Box} from "@mui/material";
import {getProductById, updateProduct} from "../api/productApi";
import {getCategories} from "../api/categoryApi";

export default function ProductEdit() {
    const {id} = useParams();
    const navigate = useNavigate();

    const [categories, setCategories] = useState([]);
    const [form, setForm] = useState({
        name: "",
        date: "",
        quantity: "",
        categoryId: ""
    });

    useEffect(() => {
        getProductById(id).then(setForm);
        getCategories().then(setCategories);
    }, [id]);

    const submit = async (e) => {
        e.preventDefault();

        if (form.name.length > 100)
            return alert("Tên sản phẩm không quá 100 ký tự");

        if (new Date(form.date) > new Date())
            return alert("Ngày nhập không hợp lệ");

        if (!Number.isInteger(+form.quantity) || +form.quantity <= 0)
            return alert("Số lượng phải là số nguyên > 0");

        await updateProduct(id, form);

        alert("Cập nhật thành công");
        navigate("/");
    };

    return (
        <Box
            sx={{
                minHeight: "100vh",
                display: "flex",
                justifyContent: "center",
                alignItems: "flex-start",
                pt: 5
            }}
        >
            <Paper sx={{p: 4, width: 500}}>
                <Typography
                    variant="h5"
                    mb={3}
                    textAlign="center"
                    fontWeight={600}
                >
                    Cập nhật sản phẩm
                </Typography>

                <form onSubmit={submit}>
                    <TextField
                        label="Tên sản phẩm"
                        fullWidth
                        margin="normal"
                        value={form.name}
                        onChange={e =>
                            setForm({...form, name: e.target.value})
                        }
                    />

                    <TextField
                        label="Ngày nhập"
                        type="date"
                        fullWidth
                        margin="normal"
                        InputLabelProps={{shrink: true}}
                        value={form.date}
                        onChange={e =>
                            setForm({...form, date: e.target.value})
                        }
                    />

                    <TextField
                        label="Số lượng"
                        type="number"
                        fullWidth
                        margin="normal"
                        value={form.quantity}
                        onChange={e =>
                            setForm({...form, quantity: e.target.value})
                        }
                    />

                    <TextField
                        select
                        label="Loại sản phẩm"
                        fullWidth
                        margin="normal"
                        value={form.categoryId}
                        onChange={e =>
                            setForm({
                                ...form,
                                categoryId: +e.target.value
                            })
                        }
                    >
                        {categories.map(c => (
                            <MenuItem key={c.id} value={c.id}>
                                {c.name}
                            </MenuItem>
                        ))}
                    </TextField>
                    <Stack direction="row" spacing={2} mt={3}>
                        <Button
                            type="submit"
                            variant="contained"
                            fullWidth
                        >
                            Lưu
                        </Button>

                        <Button
                            variant="outlined"
                            color="secondary"
                            fullWidth
                            onClick={() => navigate("/")}
                        >
                            Quay lại
                        </Button>
                    </Stack>
                </form>
            </Paper>
        </Box>
    );
}
