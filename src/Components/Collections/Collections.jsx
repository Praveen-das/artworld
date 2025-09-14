import { Box, Container, Grid, Typography } from '@mui/material'
import React from 'react'
import useFacets from '../../Hooks/useFacets'
import ItemCard from '../Ui/Card/ItemCard';

export default function Collections() {
    const { facets: { data }, isFetching, isLoading } = useFacets()
    const categories = data?.collections || []
    
    return (
        <Container>
            <Grid py='2em'>
                <Typography mb={1} variant='h5' fontWeight={500}>All Categories</Typography>
                <Typography variant='body2' fontWeight={500}> Explore a mesmerizing collection of exquisite paintings, handpicked to satisfy every art enthusiast's soul. We take great pride in offering a diverse range of artwork, carefully categorized to help you find your perfect masterpiece. Immerse yourself in the world of art through the following categories:</Typography>
                <Box
                    sx={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fill,minmax(250px,1fr))',
                        gap: 4,
                        mt: 4
                    }}
                >
                    {
                        categories?.map(({ name, id }) =>
                            <ItemCard to={`/shop?collection=${id}`} key={id} name={name}></ItemCard>
                        )
                    }
                </Box>
            </Grid>
        </Container>
    )
}
