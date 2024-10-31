'use client';
import { Accordion, AccordionDetails, AccordionSummary } from '@mui/material';
import React, { useState } from 'react';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import SeasonFilter from './SeasonFilter';
import SizeFilter from './SizeFilter';
import PriceFilter from './PriceFilter';
import ClubFilter from './ClubFilter';

interface Props {
    type: string,
}

const MenuItem: React.FC<Props> = ({ type }) => {

    const [open, setOpen] = useState(true);

    const handleAccordionChange = () => {
        setOpen(!open);
    };

    return (
        <Accordion expanded={open} onChange={handleAccordionChange}>
            <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1-content"
                id="panel1-header"
                className={`${open && 'active'} `}
            >
                {type}
            </AccordionSummary>
            <AccordionDetails>
                {type == 'Season' && <SeasonFilter />}
                {type == 'Size' && <SizeFilter />}
                {type == 'Price' && <PriceFilter />}
                {type == 'Club' && <ClubFilter />}
            </AccordionDetails>
        </Accordion>
    )
}

export default MenuItem