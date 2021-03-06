import * as AppType from '../actions/ActionTypes'

const initialState = {
	drinkJsonData : null ,
	cartList : [],
	reorderList : [],
	userData : null,
	usridx : null,
	displayInfo : null,
	opts : {
		event: 1,
		noti: 1,
		pay: 1,
		trans: 1,
	}
}

const drinkListUpdate = (state, drinkListData) => {
	return {
		...state,
		drinkJsonData : {
		  ...drinkListData
		}
	};
}

const cartListUpdate = ( state, cartListData) => {
	return {
		...state,
		cartList : [
		  ...cartListData
		]
	};
}

const reOrderProductUpdate = ( state, reorderList) => {
	return {
		...state,
		reorderList : [
		  ...reorderList
		]
	};
}


const cartListDelete = ( state, code) => {
	//받은 아이디를 배열 형태의 객체에서 필터로 찾아 
	//새로운 배열을 만든뒤 state에 적용
	function newCartList(obj) {
		if (obj.code !== code ) {
			return true
		}
	};

	const coll = state.cartList.filter(newCartList);

	return {
		...state,
		cartList : [
			...coll
		]
	};

}

const updateTocartListData = ( state, idx, qty, cartType ) => {



	if( cartType == '수정구매' ){

		var arr = state.reorderList
		arr[idx].qty = qty

		return {
			...state,
			reorderList : [
				...arr
			]
		};

	}

	var arr = state.cartList
	arr[idx].qty = qty
	
	return {
		...state,
		cartList : [
			...arr
		]
	};


}

const loginSucess = ( state, userData , usridx, displayInfo) => {
	return {
		...state,
		userData : userData,
		usridx : usridx,
		displayInfo : displayInfo,
		opts : userData.opts
	};
}


const updateAlramData = ( state, alramData) => {
	console.log('리듀서 업데이트 확인', alramData)
	return {
		...state,
		opts : alramData
	};
}


export default function reducer(state = initialState , action ){
  switch (action.type){
		case AppType.REORDER_PRODUCT_UPDATE:
			return reOrderProductUpdate(state, action.reorderList)
		case AppType.DRINK_LIST_UPDATE:
			return drinkListUpdate(state, action.drinkListData)
		case AppType.CART_LIST_UPDATE:
			return cartListUpdate(state, action.cartListData)
		case AppType.CART_LIST_DELETE:
			return cartListDelete(state, action.id)
		case AppType.CART_LIST_QTY_UPDATE:
			return updateTocartListData(state, action.idx, action.qty, action.cartType)	
		case AppType.LOGIN_SUCESS:
			return loginSucess(state, action.userData, action.usridx, action.displayInfo)	
		case AppType.UPDATE_ALRAMDATA:
			return updateAlramData(state, action.alramData )	
		default :	
			return state;	
  }
}







