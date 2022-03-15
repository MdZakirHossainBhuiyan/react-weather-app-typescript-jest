import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Home.css';

const Home = () => {
    const [searchValue, setSearchValue] = useState<string>("");

    const navigate = useNavigate();

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchValue(event.target.value);
    }

    const onSubmit = () => {
        navigate(`/country/${searchValue}`);
    }

    return (
        <div className='weatherSearchArea'>
            <h1>Check The Today's Weather Status</h1>

            <form className='formContent'>
                <input onChange={handleChange} className='inputField' type="text" name='countryName' placeholder='Enter country' />

                <button onClick={onSubmit} disabled={!searchValue} className={searchValue? "submitButtonActive" : "submitButtonDisabled"}>Submit</button>
            </form>
        </div>
    );
};

export default Home;