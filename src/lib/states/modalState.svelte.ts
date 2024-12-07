// const modalState = (modalState: boolean) => {
// 	 $state = $state({ value: modalState });
// 	function setTrue() {
// 		state.value = true;
// 	}
// 	function setFalse() {
// 		state.value = false;
// 	}

// 	function toggleModal() {
// 		state.value = !state.value;
// 	}
// 	return {
// 		setTrue,
// 		setFalse,
// 		toggleModal,
// 		get() {

// 			return state
// 		}
// 	};
// };

class ModalState {
	public value = $state<boolean>();
	constructor(modalState: boolean) {
		this.value = modalState;
	}
	setTrue() {
		this.value = true;
	}
	setFalse() {
		this.value = false;
	}

	toggleModal() {
		this.value = !this.value;
	}
}

export const searchModalState = new ModalState(false);
export const registerModalState = new ModalState(false);
export const confirmEmailModalState = new ModalState(false);
export const loginModalState = new ModalState(false);
export const requestPasswordResetModalState = new ModalState(false);
export const productModalState = new ModalState(false);
export const cartSheetState = new ModalState(false);
export const addressModalState = new ModalState(false);
export const editAddressModalState = new ModalState(false);
export const enterDeliveryModalState = new ModalState(false);
export const mobileAuthState = new ModalState(false);
