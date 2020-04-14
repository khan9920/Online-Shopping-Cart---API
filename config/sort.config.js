const sortingOrder = {
  ascending: "asc",
  descending: "desc",
};

const sortingColumn = {
  users: {
    "-1": "",
    0: "email",
    1: "company_name_lowercase",
    2: "first_name_lowercase",
    3: "last_name_lowercase",
    4: "role",
    5: "phone",
    6: "state_lowercase",
  },
};

module.exports = { sortingOrder, sortingColumn };
