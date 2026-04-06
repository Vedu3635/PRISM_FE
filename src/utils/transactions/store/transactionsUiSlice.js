import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  filterCategory: null,
  dateFrom: null,
  dateTo: null,
  isAddModalOpen: false,
};

const transactionsUiSlice = createSlice({
  name: 'transactionsUi',
  initialState,
  reducers: {
    setFilterCategory(state, action) {
      state.filterCategory = action.payload || null;
    },
    setDateRange(state, action) {
      const { from, to } = action.payload || {};
      state.dateFrom = from || null;
      state.dateTo = to || null;
    },
    openAddModal(state) {
      state.isAddModalOpen = true;
    },
    closeAddModal(state) {
      state.isAddModalOpen = false;
    },
  },
});

export const {
  setFilterCategory,
  setDateRange,
  openAddModal,
  closeAddModal,
} = transactionsUiSlice.actions;

export default transactionsUiSlice.reducer;

