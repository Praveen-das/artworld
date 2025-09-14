import { Box, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import Avatar from '../../Ui/Avatar/Avatar';

function SellerProfile({seller}) {
    
    return (
        <Box display='flex' gap={1} alignItems='center'>
            <Avatar
                sx={{ width: 28, height: 28, fontSize: 12 }}
                displayName={seller?.displayName}
                profilePicture={seller?.photo}
            />
            <Link to={`/artists/profile/${seller?.id}`}>
                <Typography sx={{ ":hover": { textDecoration: 'underline' } }} fontWeight={600}>
                    {seller?.displayName}
                </Typography>
            </Link>
        </Box>
    )
}
export default SellerProfile
