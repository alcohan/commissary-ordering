import { useState } from "react"
import { FormGroup } from "react-bootstrap"


var DatePicker = require("react-bootstrap-date-picker")

const MyDatePicker = () => {
    const [value, setValue] = useState(new Date().toISOString())

    const handleChange = () => {

    }
    return (
        <FormGroup>
            {/* <ControlLabel>Label</ControlLabel>
            <DatePicker id="example-datepicker" value={value}
                onChange={handleChange} />
            <HelpBlock>Help</HelpBlock> */}
        </FormGroup>

    )
}

export default MyDatePicker;