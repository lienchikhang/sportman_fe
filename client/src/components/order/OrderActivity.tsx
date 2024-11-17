'use client';
import * as React from 'react';
import { styled } from '@mui/material/styles';
import Stack from '@mui/material/Stack';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import PaymentIcon from '@mui/icons-material/Payment';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import StepConnector, { stepConnectorClasses } from '@mui/material/StepConnector';
import { StepIconProps } from '@mui/material/StepIcon';
import DoNotDisturbAltIcon from '@mui/icons-material/DoNotDisturbAlt';


const ColorlibConnector = styled(StepConnector)(({ theme }) => ({
    [`&.${stepConnectorClasses.alternativeLabel}`]: {
        // top: 22, // Căn chỉnh connector thẳng hàng với icon
        position: 'static',

    },
    [`&.${stepConnectorClasses.active}`]: {
        [`& .${stepConnectorClasses.line}`]: {
            backgroundImage:
                'linear-gradient( 93.2deg,  rgba(24,95,246,1) 14.4%, rgba(27,69,166,1) 90.8% )',
        },
    },
    [`&.${stepConnectorClasses.completed}`]: {
        [`& .${stepConnectorClasses.line}`]: {
            backgroundImage:
                'linear-gradient( 93.2deg,  rgba(24,95,246,1) 14.4%, rgba(27,69,166,1) 90.8% )',
        },
    },
    [`& .${stepConnectorClasses.line}`]: {
        height: 150,
        position: 'static',
        width: 3, // Độ rộng của connector
        border: 0,
        backgroundColor: '#eaeaf0',
        borderRadius: 1, // Căn chỉnh đúng vị trí
    },
}));

const ColorlibCancelConnector = styled(StepConnector)(({ theme }) => ({
    [`&.${stepConnectorClasses.alternativeLabel}`]: {
        // top: 22, // Căn chỉnh connector thẳng hàng với icon
        position: 'static',

    },
    [`&.${stepConnectorClasses.active}`]: {
        [`& .${stepConnectorClasses.line}`]: {
            backgroundImage:
                'linear-gradient(117deg, rgba(25,92,239,1) 0%, rgba(255,0,0,1) 100%)',
        },
    },
    [`&.${stepConnectorClasses.completed}`]: {
        [`& .${stepConnectorClasses.line}`]: {
            backgroundImage:
                'linear-gradient(117deg, rgba(25,92,239,1) 0%, rgba(255,0,0,1) 100%)',
        },
    },
    [`& .${stepConnectorClasses.line}`]: {
        height: 150,
        position: 'static',
        width: 3, // Độ rộng của connector
        border: 0,
        backgroundColor: '#eaeaf0',
        borderRadius: 1, // Căn chỉnh đúng vị trí
    },
}));

const ColorlibStepIconRoot = styled('div')<{
    ownerState: { completed?: boolean; active?: boolean };
}>(({ theme }) => ({
    backgroundColor: '#ccc',
    zIndex: 1,
    color: '#fff',
    width: 50,
    border: 0,
    height: 50,
    display: 'flex',
    borderRadius: '50%',
    justifyContent: 'center',
    alignItems: 'center',
    ...theme.applyStyles('dark', {
        backgroundColor: theme.palette.grey[700],
    }),
    variants: [
        {
            props: ({ ownerState }) => ownerState.active,
            style: {
                backgroundImage:
                    'linear-gradient( 93.2deg,  rgba(24,95,246,1) 14.4%, rgba(27,69,166,1) 90.8% )',
                boxShadow: '0 4px 10px 0 rgba(0,0,0,.25)',
            },
        },
        {
            props: ({ ownerState }) => ownerState.completed,
            style: {
                backgroundImage:
                    'linear-gradient(117deg, rgba(25,92,239,1) 0%, rgba(255,0,0,1) 100%)',
            },
        },
    ],
}));

function ColorlibStepIcon(props: StepIconProps) {
    const { active, completed, className } = props;

    const icons: { [index: string]: React.ReactElement<unknown> } = {
        1: <PaymentIcon />,
        2: <LocalShippingIcon />,
        3: <CheckCircleIcon />,
    };

    return (
        <ColorlibStepIconRoot ownerState={{ completed, active }} className={className}>
            {icons[String(props.icon)]}
        </ColorlibStepIconRoot>
    );
}

function ColorlibStepCancelIcon(props: StepIconProps) {
    const { active, completed, className } = props;

    const icons: { [index: string]: React.ReactElement<unknown> } = {
        1: <PaymentIcon />,
        2: <DoNotDisturbAltIcon />,
    };

    return (
        <ColorlibStepIconRoot ownerState={{ completed, active }} className={className}>
            {icons[String(props.icon)]}
        </ColorlibStepIconRoot>
    );
}

interface Props {
    orderState: string,
    date: {
        createdAt: string | null,
        deliveredAt: string | null,
        deliveringAt: string | null,
        cancelAt: string | null,
    }
}

const OrderActivity: React.FC<Props> = ({ orderState, date }) => {

    const [active, setActive] = React.useState(0);

    const steps = [{
        main: 'Placed',
        date: date?.createdAt || 'UnKnown',
        sub: '. It will be delivered to customer within 2-3 days. Contact (84) 932 384 332 or sportman@helpservice.com to get support',
    }, {
        main: 'Delivering',
        date: date?.deliveringAt || 'UnKnown',
        sub: '. It will be delivered to customer soon. Thank you for your impation.'
    }, {
        main: 'Delivered',
        date: date?.deliveredAt || 'UnKnown',
        sub: 'Thank you for choosing sportman.'
    }];


    React.useEffect(() => {
        switch (orderState) {

            case 'PAID':
            case 'UNPAID':
                setActive(0);
                break;
            case 'DELIVERING':
                setActive(1);
                break;
            case 'DELIVERED':
                setActive(2);
                break;
            default:
                // case 'CANCEL':
                setActive(steps.length - 1);
                break;
        }
    }, []);


    if (orderState == 'CANCEL') {
        const newSteps = [{
            main: 'Placed',
            date: date?.createdAt || 'UnKnown',
            sub: '. It will be delivered to customer within 2-3 days. Contact (84) 932 384 332 or sportman@helpservice.com to get support',
        }, {
            main: 'Cancel',
            date: date?.cancelAt || 'UnKnown',
            sub: '. If you have any questions, contact us (84) 932 384 332 or sportman@helpservice.com',
        }]

        return (
            <Stack sx={{ width: '100%' }} spacing={10}>
                <Stepper alternativeLabel activeStep={active} orientation="vertical" connector={<ColorlibCancelConnector />} >
                    {newSteps.map((label) => (
                        <Step key={label.main}>
                            <StepLabel sx={{
                                display: 'flex !important',
                                flexDirection: 'row !important',
                                gap: '12px',
                                margin: '0 !important',
                                marginTop: '0 !important',

                            }} StepIconComponent={ColorlibStepCancelIcon}>
                                <p className='text-start mb-1 font-semibold'>{label.date}</p>
                                <p className='text-start'>Order has been <span className='font-semibold'>{label.main}</span>{label.sub}</p>
                            </StepLabel>
                        </Step>
                    ))}
                </Stepper>
            </Stack>
        );
    }

    return (//connector={<ColorlibConnector />}
        <Stack sx={{ width: '100%' }} spacing={10}>
            <Stepper alternativeLabel activeStep={active} orientation="vertical" connector={<ColorlibConnector />} >
                {steps.map((label) => (
                    <Step key={label.main}>
                        <StepLabel sx={{
                            display: 'flex !important',
                            flexDirection: 'row !important',
                            gap: '12px',
                            margin: '0 !important',
                            marginTop: '0 !important',
                        }} StepIconComponent={ColorlibStepIcon}>
                            <p className='text-start mb-1 font-semibold'>{label.date}</p>
                            <p className='text-start'>Order has been <span className='font-semibold'>{label.main}</span>{label.sub}</p>
                        </StepLabel>
                    </Step>
                ))}
            </Stepper>
        </Stack>
    );
}

export default OrderActivity;