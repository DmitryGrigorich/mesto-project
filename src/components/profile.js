import {
  profileName,
  profession,
  avatar
} from './constants.js'

const renderProfile = (nameValue, jobValue) => {
  profileName.textContent = nameValue;
  profession.textContent = jobValue;
}

const renderAvatar = (src) => {
  avatar.src = src
}

export {
  renderProfile,
  renderAvatar
}