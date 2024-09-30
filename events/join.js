const join = ({ userId, users, id }) => {
	users.push({
		userId,
		id
	});
};

export default join;