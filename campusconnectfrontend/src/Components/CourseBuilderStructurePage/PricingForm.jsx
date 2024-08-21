import React from 'react';
import { Container, Typography, FormControl, TextField, Button, Box } from '@mui/material';
import Autocomplete from '@mui/material/Autocomplete';
import { currencies, currencySymbols, priceTiersBase } from './HelperFunction';

const PricingForm = ({ courseData, setCourseData }) => {

    const handleChange = (event, newValue, key) => {
        setCourseData(prevData => ({
            ...prevData,
            [key]: newValue ? newValue.value : ''
        }));
    };

    const handleInputChange = (event, key) => {
        setCourseData(prevData => ({
            ...prevData,
            [key]: event.target.value
        }));
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        // Handle form submission
        console.log(courseData);
    };

    const getPriceTiers = (currency) => {
        const symbol = currencySymbols[currency] || '$';
        return priceTiersBase.map(tier => ({
            ...tier,
            label: tier.value === '0' ? 'Free' : `${symbol}${tier.value}`
        }));
    };

    return (
        <Container>
            <Box mb={4}>
                <Typography variant="h2">Pricing</Typography>
                <Typography variant="body1" mt={2} sx={{ color: "black" }}>
                    Please select the currency and the price tier for your course. If you’d like to offer your course for free, it must have a total video length of less than 2 hours. Also, courses with practice tests cannot be free.
                </Typography>
            </Box>

            <form >
                <Box mb={4}>
                    <Typography variant="h6">Set a price for your course</Typography>

                    <FormControl fullWidth margin="normal">
                        <Autocomplete
                            options={currencies}
                            getOptionLabel={(option) => option.label}
                            value={currencies.find(currency => currency.value === courseData.currency) || null}
                            onChange={(event, newValue) => handleChange(event, newValue, 'currency')}
                            renderInput={(params) => <TextField {...params} label="Currency" variant="outlined" required />}
                        />
                    </FormControl>

                    <FormControl fullWidth margin="normal">
                        <Autocomplete
                            options={getPriceTiers(courseData.currency)}
                            getOptionLabel={(option) => option.label}
                            value={priceTiersBase.find(tier => tier.value === courseData.priceTier) || null}
                            onChange={(event, newValue) => handleChange(event, newValue, 'priceTier')}
                            renderInput={(params) => <TextField {...params} label="Price Tier" variant="outlined" required />}
                        />
                    </FormControl>

                    <TextField
                        fullWidth
                        label="Bank Name"
                        margin="normal"
                        value={courseData.bankName}
                        onChange={(e) => handleInputChange(e, 'bankName')}
                        required
                    />
                    <TextField
                        fullWidth
                        label="Account Number"
                        margin="normal"
                        value={courseData.accountNumber}
                        onChange={(e) => handleInputChange(e, 'accountNumber')}
                        required
                    />
                    <TextField
                        fullWidth
                        label="IFSC Code"
                        margin="normal"
                        value={courseData.ifscCode}
                        onChange={(e) => handleInputChange(e, 'ifscCode')}
                        required
                    />
                </Box>

                <Button type="submit" variant="contained" color="primary" onClick={handleSubmit}>
                    Save
                </Button>
            </form>
        </Container>
    );
}

export default PricingForm;
