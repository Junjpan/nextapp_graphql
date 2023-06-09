const users = [
    {
      userId: 1234,
      firstName: 'John',
      lastName: 'Smith',
      email: 'johnsmith@example.com'
    },
    {
      userId: 1235,
      firstName: 'Jane',
      lastName: 'Doe',
      email: 'janedoe@example.com'
    }
  ]
  
  const orders = [
    {
      orderId: 1111,
      orderDate: '2023-01-01T00:00:00Z',
      userId: 1234,
      items: [1,1]
    },
    {
      orderId: 2222,
      orderDate: '2023-01-08T00:00:00Z',
      userId: 1234,
      items: [1]
    },
    {
      orderId: 3333,
      orderDate: '2023-01-15T00:00:00Z',
      userId: 1234,
      items: [1,2]
    },
    {
      orderId: 4444,
      orderDate: '2023-01-01T00:00:00Z',
      userId: 1235,
      items: [2,2]
    },
  ]
  
  const items = [
    {
      itemId: 1,
      itemName: 'GraphQL Magazine',
      itemPrice: 20.00,
    },
    {
      itemId: 2,
      itemName: 'Coffee',
      itemPrice: 10.00,
    },
  ]

  export {users,items,orders}