import { useEffect, useState } from 'react';
import '../styles/toggle-switch.css'

const ToggleSwitch = ({ label }) => {

    const [theme, setTheme] = useState('light');
    
    const handleChange = (e) => {
        console.log('mode change');
        setTheme(e.target.checked ? "dark" : "light");
    };

    useEffect(() => {
        document.body.setAttribute("data-theme", theme)
    }, [theme])

	return (
        <div className="toggle-switch">
            <input
                type="checkbox"
                className="checkbox"
                name={label}
                id={label}
                checked={theme === "dark"}
                onChange={(e)=>handleChange(e)}
            />
            <label className="label" htmlFor={label}>
                <span className="inner"/>
                <span className="switch" />
            </label>
        </div>
	);
};

export default ToggleSwitch;