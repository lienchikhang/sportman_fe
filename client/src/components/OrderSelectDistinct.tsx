'use client';
import { useAddress } from '@/libs/contexts/address.context';
import { FormControl, InputLabel, MenuItem, Select, SelectChangeEvent } from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState } from 'react';

const OrderSelectDistinct = () => {

    const [curDistinct, setCurDistinct] = useState('');
    const [distincts, setDistincts] = useState<any[] | null>(null);
    const { provinceId, distinctId, handleSetDistinct } = useAddress();

    console.log({ provinceId, distinctId });

    useEffect(() => {
        axios.get(`https://dev-online-gateway.ghn.vn/shiip/public-api/master-data/district`, {
            headers: {
                'token': '0284c1e7-9f67-11ef-8e53-0a00184fe694',
            },
            data: {
                "province_id": provinceId
            }
        }).then((res) => {
            console.log({ dis: res });
            const filterProvinces = res?.data?.data?.filter((dis: any) => dis.ProvinceID == provinceId).map((pro: any) => ({ name: pro?.DistrictName, id: pro?.DistrictID }))
            setDistincts(filterProvinces);
            setCurDistinct(filterProvinces[0]?.name);
        }).catch((err) => {
            setDistincts(null);
        })
    }, [provinceId]);

    const handleChange = (event: SelectChangeEvent) => {
        setCurDistinct(event.target.value);
    };

    const handleClickItem = (id: number) => {
        handleSetDistinct(+id)
    }


    return (
        <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
            <Select
                labelId="demo-select-small-label"
                value={curDistinct}
                onChange={handleChange}
            >
                {
                    distincts ? distincts.map((dist, idx) => {
                        return <MenuItem onClick={() => handleClickItem(dist?.id)} key={idx} value={dist?.name}>{dist?.name}</MenuItem>
                    }) : <MenuItem value={0}>Nothing here</MenuItem>
                }
            </Select>
        </FormControl>
    )
}

export default OrderSelectDistinct;