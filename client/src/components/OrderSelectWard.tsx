'use client';
import { useAddress } from '@/libs/contexts/address.context';
import { FormControl, InputLabel, MenuItem, Select, SelectChangeEvent } from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState } from 'react';

const OrderSelectWard = () => {

    const [curWard, setCurWard] = useState('');
    const [wards, setWards] = useState<any[] | null>(null);
    const { distinctId, handleSetAddress } = useAddress();

    useEffect(() => {
        axios.get(`https://dev-online-gateway.ghn.vn/shiip/public-api/master-data/ward?district_id`, {
            headers: {
                'token': '0284c1e7-9f67-11ef-8e53-0a00184fe694',
            },
            data: {
                "district_id": distinctId
            }
        }).then((res) => {
            console.log({ ward: res });
            const filterProvinces = res?.data?.data?.filter((dis: any) => dis.DistrictID == distinctId).map((pro: any) => pro?.WardName)
            setWards(filterProvinces);
            setCurWard(filterProvinces[0]?.name);
        }).catch((err) => {
            setWards(null);
        })
    }, [distinctId]);

    const handleChange = (event: SelectChangeEvent) => {
        setCurWard(event.target.value);
    };

    const handleClickItem = (address: string) => {
        // handleSetAddress(+id)
        handleSetAddress(address);
    }


    return (
        <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
            <Select
                labelId="demo-select-small-label"
                value={curWard}
                onChange={handleChange}
            >
                {
                    wards ? wards.map((dist, idx) => {
                        return <MenuItem onClick={() => handleClickItem(dist)} key={idx} value={dist}>{dist}</MenuItem>
                    }) : <MenuItem value={0}>Nothing here</MenuItem>
                }
            </Select>
        </FormControl>
    )
}

export default OrderSelectWard;