import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {Table, TableBody, TableCell, TableHead, TableRow, Paper, Typography, Button, Box} from "@mui/material";
import SearchBar from "../components/SearchBar";
import { getProducts } from "../api/productApi";
import { getCategories } from "../api/categoryApi";

export default function ProductList() {
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [filtered, setFiltered] = useState([]);

    useEffect(() => {
        getCategories().then(setCategories);

        getProducts().then(data => {
            data.sort((a, b) => a.quantity - b.quantity);
            setProducts(data);
            setFiltered(data);
        });
    }, []);

    return (
        <Box
            sx={{
                maxWidth: 1100,
                mx: "auto",
                mt: 4
            }}
        >
            <Paper sx={{ p: 3 }}>
                <Typography
                    variant="h4"
                    fontWeight={600}
                    mb={3}
                    textAlign="center"
                >
                    Quản lý sản phẩm
                </Typography>
                <Paper
                    sx={{
                        p: 2,
                        mb: 3,
                        backgroundColor: "#f9f9f9"
                    }}
                    elevation={1}
                >
                    <SearchBar
                        products={products}
                        categories={categories}
                        onSearch={setFiltered}
                    />
                </Paper>
                {filtered.length === 0 ? (
                    <Typography
                        color="error"
                        textAlign="center"
                        mt={4}
                        fontSize={18}
                    >
                        Không tìm thấy sản phẩm
                    </Typography>
                ) : (
                    <Table>
                        <TableHead>
                            <TableRow sx={{ backgroundColor: "#f0f0f0" }}>
                                <TableCell><b>Mã sản phẩm</b></TableCell>
                                <TableCell><b>Tên sản phẩm</b></TableCell>
                                <TableCell><b>Ngày nhập</b></TableCell>
                                <TableCell><b>Số lượng</b></TableCell>
                                <TableCell><b>Loại sản phẩm</b></TableCell>
                                <TableCell />
                            </TableRow>
                        </TableHead>

                        <TableBody>
                            {filtered.map(p => (
                                <TableRow
                                    key={p.id}
                                    hover
                                >
                                    <TableCell>{p.code}</TableCell>
                                    <TableCell>{p.name}</TableCell>
                                    <TableCell>
                                        {new Date(p.date).toLocaleDateString("vi-VN")}
                                    </TableCell>
                                    <TableCell>{p.quantity}</TableCell>
                                    <TableCell>
                                        {categories.find(c => Number(c.id) === p.categoryId)?.name}
                                    </TableCell>
                                    <TableCell>
                                        <Button
                                            component={Link}
                                            to={`/edit/${p.id}`}
                                            variant="contained"
                                            size="small"
                                        >
                                            Cập nhật
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                )}
            </Paper>
        </Box>
    );
}
