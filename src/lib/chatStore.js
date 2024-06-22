import { create } from 'zustand'
import { useUserStore } from './useStore';

export const useChatStore = create((set) => ({
    chatId: null,
    user: null,
    isCurrentUserBlocked: false,
    isReceiverBlocked: false,
    changeChat: (chatId, user) => {
        const currentUser = useUserStore.getState().currentUser;

        // Checking current user blocked 

        if(user.blocked.includes(currentUser.id)){
            return set({
                chatId,
                user: null,
                isCurrentUserBlocked : true,
                isReceiverBlocked: false
            });
        }
        // checking if receiver is blocked

        else if(currentUser.blocked.includes(user.id)){
            return set({
                chatId,
                user:null,
                isCurrentUserBlocked: false,
                isReceiverBlocked: true
            });
        }

        else {
                set({
                chatId,
                user,
                isCurrentUserBlocked: false,
                isReceiverBlocked: false
            });
        }
    },

    changeBlock: () => {
        set(state => ({...state, isReceiverBlocked: !state.isReceiverBlocked}));
    }
}));