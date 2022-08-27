import { FormInputLabel, Group, Input, } from './form-input.styles';

const FormInput = ({ label, ...otherProps }) => {
    return (
        <Group>
            <Input {...otherProps} />
            {
                label && (
                    <FormInputLabel
                        shrink={Boolean(
                            otherProps.value &&
                            typeof otherProps.value === "string" &&
                            otherProps.value.length
                        )}>
                        {label}
                    </FormInputLabel>
                )
            }
        </Group>
    );
};

export default FormInput;