import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux';
const Alert = ({ alerts }) => 
alerts !== null && alerts.length > 0 && alerts.map(alert => (
    // whenever use map() then the children need a key [its a list output => required key]
    <div key={alert.id} className={`alert alert-${alert.alertType}`}>
        { alert.msg }
    </div>
))

Alert.propTypes = {
    //identify alerts as Array only.
    alerts: PropTypes.array.isRequired, 
}

//function name for getting state from redux

//Take data from redux store 
//______________________________________________
const mapStateToProps = state => ({
    //at root store of reduce root = state;
    //if wanna take something else: state.[name] in rootReducer
    alerts: state.alert //the name of variable is optional
})

export default connect(mapStateToProps)(Alert);
//______________________________________________