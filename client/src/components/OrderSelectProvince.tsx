'use client';
import { useAddress } from '@/libs/contexts/address.context';
import { FormControl, InputLabel, MenuItem, Select, SelectChangeEvent } from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState } from 'react';

const OrderSelectProvince = () => {

    const [curProvince, setCurProvince] = useState('');
    const [provinces, setProvices] = useState<any[] | null>(null);
    const { handleSetProvince } = useAddress();

    useEffect(() => {
        axios.get(`https://dev-online-gateway.ghn.vn/shiip/public-api/master-data/province`, {
            headers: {
                'token': '0284c1e7-9f67-11ef-8e53-0a00184fe694'
            }
        }).then((res) => {
            console.log({ res });
            const filterProvinces = res?.data?.data?.map((pro: any) => ({ name: pro?.NameExtension[0], id: pro?.ProvinceID }))
            setProvices(filterProvinces);
            setCurProvince(filterProvinces[0]?.name);
        }).catch((err) => {
            setProvices(null);
        })
    }, []);

    const handleChange = (event: SelectChangeEvent) => {
        setCurProvince(event.target.value);
    };

    const handleClickItem = (id: number) => {
        handleSetProvince(+id)
    }


    return (
        <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
            <Select
                labelId="demo-select-small-label"
                value={curProvince}
                onChange={handleChange}
            >
                {
                    provinces ? provinces.map((pro, idx) => {
                        return <MenuItem onClick={() => handleClickItem(pro?.id)} key={idx} value={pro?.name}>{pro?.name}</MenuItem>
                    }) : <MenuItem value={0}>Nothing here</MenuItem>
                }
            </Select>
        </FormControl>
    )
}

export default OrderSelectProvince