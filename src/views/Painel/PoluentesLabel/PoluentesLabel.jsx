import React from 'react'
import Icon from "@material-ui/core/Icon";
import Danger from "components/Typography/Danger.jsx";
import Success from "components/Typography/Success";
import Warning from "components/Typography/Warning";
export default function LabelPoluentes(props) {
    const { value } = props
    if (value < 25 ) {
        return (
            <Success>
                <Icon >check_circle_outline</Icon>
                {`Nível do indicador é aceitavel`}
            </Success>
        )
    }

    if (value >= 25 && value < 50 && value != 0) {
        return (
            <Warning>
               <Icon >warning</Icon>
                {`Nível do indicador requer atenção`}
            </Warning>
        )
    }

    if (value > 50 && value < 100 && value != 0) {
        return (
            <Danger>
                <Icon >error</Icon>
                {`Nível do indicador requer atenção`}
            </Danger>
        )
    }
    return (
        <Danger>
            <Icon >error</Icon>
            {`Nível do indicador é prejudicial atenção`}
        </Danger>
    )
}

