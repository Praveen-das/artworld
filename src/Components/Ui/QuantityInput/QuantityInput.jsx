import { IconButton, Typography } from '@mui/material';
import { useRef, useState } from 'react';
import './style.css'
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';

function QuantityInput({ onChange = () => null, defaultValue, size='large' }) {
    const [value, setValue] = useState(defaultValue || 1)
    const pre = useRef(null)
    const increase = () => {
        if (value + 1 > 5) return
        setValue(pre => pre + 1)
    }

    const decrease = () => {
        if (value - 1 === 0) return
        setValue(pre => pre - 1)
    }

    let position = 'absolute'

    return (
        <form action="submit" onSubmit={(e) => {
            e.preventDefault()
            onChange(value);
        }}>
            <div id='qtyInput' className={`qtyInput--${size}`}>
                <IconButton sx={{ position, left: 4 }} type='submit' onClick={decrease}><RemoveIcon sx={{ color: 'black', fontSize: 16 }} /></IconButton>
                <Typography sx={{ mx: 'auto' }} fontWeight={700}>{value}</Typography>
                <IconButton sx={{ position, right: 4 }} type='submit' onClick={increase}><AddIcon sx={{ color: 'black', fontSize: 16 }} /></IconButton>
            </div>
        </form>
    )
}

export default QuantityInput;
