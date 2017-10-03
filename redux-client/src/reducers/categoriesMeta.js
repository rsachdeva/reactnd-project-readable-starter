import {
  HOME,
  REQUEST_CATEGORIES,
  RECEIVE_CATEGORIES
} from '../actions'

const initial = {
  isFetchingCategories: false,
  categories: [HOME]
}

export const categoriesMeta = (categoriesMetaState = initial, action) => {
  switch (action.type) {
    case REQUEST_CATEGORIES:
      return {...categoriesMetaState, isFetchingCategories: true }
    case RECEIVE_CATEGORIES:
      const state_after_receive_categories =  {
        ...categoriesMetaState,
        isFetchingCategories: false,
        categories: [HOME].concat(action.categories)
      }
      return state_after_receive_categories
    default:
      return categoriesMetaState
  }
}

export default categoriesMeta
