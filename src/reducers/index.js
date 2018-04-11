import { combineReducers } from 'redux'
import { reducer as formReducer } from 'redux-form'

//component
import applyDamageSubmitReducer from '../android/components/applyDamage/submit/ApplyDamageSubmitReducer'
import carInfoForDemageReducer from '../android/components/demageInfo/carInfoForDemage/CarInfoForDemageReducer'
import demageOpResultReducer from '../android/components/demageInfo/demageOpResult/DemageOpResultReducer'
import demageEditorReducer from '../android/components/demageInfo/demageEditor/DemageEditorReducer'
import imageListForDemageReducer from '../android/components/demageInfo/imageListForDemage/ImageListForDemageReducer'
import recordForDemageReducer from '../android/components/demageInfo/recordForDemage/RecordForDemageReducer'
import sendSMSReducer from '../android/components/retrievePassword/sendSMS/SendSMSReducer'

//view
import addCarReducer from '../android/views/createCar/addCarReducer'
import addCarImageReducer from '../android/views/uploadImageForCreateCar/addCarImageReducer'
import addRequirementReducer from '../android/views/createRequirement/addRequirementReducer'
import applyDamageUploadImageReducer from '../android/views/applyDamageUploadImage/ApplyDamageUploadImageReducer'
import baseAddrReducer from '../android/views/select/baseAddr/baseAddrReducer'
import cityReducer from '../android/views/select/city/cityReducer'
import commandReducer from '../android/views/command/commandReducer'
import carsReducer from '../android/views/cars/carsReducer'
import commandListReducer from '../android/views/commandList/commandListReducer'
import carInfoReducer from '../android/views/carInfo/carInfoReducer'
import driverReducer from './driverReducer'
import demageListReducer from '../android/views/demageList/DemageListReducer'
import entrustReducer from '../android/views/select/entrust/entrustReducer'
import homeReducer from '../android/views/blockInitial/home/homeReducer'
import initializationReducer from '../android/views/initialization/initializationReducer'
import loginReducer from '../android/views/login/loginReducer'
import makeReducer from '../android/views/select/make/makeReducer'
import personalCenterReducer from '../android/views/personalCenter/PersonalCenterReducer'
import receiveReducer from '../android/views/select/receive/receiveReducer'
import requirementListReducer from '../android/views/requirementList/requirementListReducer'
import requirementInfoReducer from '../android/views/requirementInfo/requirementInfoReducer'
import retrievePasswordReducer from '../android/views/retrievePassword/RetrievePasswordReducer'
import responsibilityListReducer from '../android/views/responsibilityList/ResponsibilityListReducer'
import settingReducer from '../android/views/blockInitial/setting/SettingReducer'
import selectDriverReducer from '../android/views/select/driver/SelectDriverReducer'
import searchCarReducer from '../android/views/select/searchCar/SearchCarReducer'
import searchDamageReducer from '../android/views/searchDamage/SearchDamageReducer'
import truckReducer from '../android/views/select/truck/truckReducer'
import taskInfoAtWorkReducer from '../android/views/taskInfoAtWork/taskInfoAtWorkReducer'
import taskReducer from '../android/views/task/taskReducer'


export default combineReducers({
    form: formReducer,
    homeReducer,
    cityReducer,
    entrustReducer,
    receiveReducer,
    addRequirementReducer,
    baseAddrReducer,
    requirementListReducer,
    driverReducer,
    truckReducer,
    commandListReducer,
    taskInfoAtWorkReducer,
    carInfoReducer,
    makeReducer,
    addCarReducer,
    addCarImageReducer,
    commandReducer,
    carsReducer,
    taskReducer,
    requirementInfoReducer,
    retrievePasswordReducer,
    sendSMSReducer,
    //2018-3-26
    initializationReducer,
    loginReducer,
    settingReducer,
    responsibilityListReducer,
    demageListReducer,
    personalCenterReducer,
    selectDriverReducer,
    applyDamageSubmitReducer,
    searchCarReducer,
    carInfoForDemageReducer,
    recordForDemageReducer,
    demageEditorReducer,
    applyDamageUploadImageReducer,
    imageListForDemageReducer,
    demageOpResultReducer,
    searchDamageReducer
})