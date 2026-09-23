const dashboardData = {
  summary: { availableLots: 12, incomingRequests: 5, activePickups: 4, pendingHandovers: 3, pendingPayments: 18400, todayIntake: 126 },
  lots: [
    { id:'1', referenceId:'LOT-2041', material:'PCB', weight:42, rate:145, location:'Delhi', distance:'2.8 km', collector:'Collector A' },
    { id:'2', referenceId:'LOT-2038', material:'Cables', weight:58, rate:85, location:'Ghaziabad', distance:'7.2 km', collector:'Collector B' },
    { id:'3', referenceId:'LOT-2035', material:'Battery', weight:31, rate:72, location:'Noida', distance:'10.4 km', collector:'Collector C' },
    { id:'4', referenceId:'LOT-2032', material:'LCD', weight:37, rate:110, location:'Delhi', distance:'4.1 km', collector:'Collector D' }
  ],
  rates: [ {id:'pcb',material:'PCB',price:145}, {id:'cables',material:'Cables',price:85}, {id:'battery',material:'Battery',price:72}, {id:'lcd',material:'LCD',price:110} ],
  pickups: [
    {id:'p1',lotId:'LOT-2032',material:'LCD',weight:37,date:'Today',time:'4:00 PM',location:'Delhi',status:'Scheduled'},
    {id:'p2',lotId:'LOT-2029',material:'Cables',weight:24,date:'Tomorrow',time:'11:30 AM',location:'Noida',status:'Assigned'}
  ],
  handovers: [
    {id:'h1',referenceId:'KC-H-20260917-0001',material:'PCB',weight:40,value:5800},
    {id:'h2',referenceId:'KC-H-20260917-0002',material:'Cables',weight:52,value:4420}
  ],
  payments: [
    {id:'pay1',collector:'Collector A',lotId:'LOT-2041',amount:6090,method:'UPI',status:'Pending'},
    {id:'pay2',collector:'Collector C',lotId:'LOT-2035',amount:2232,method:'Cash',status:'Paid'},
    {id:'pay3',collector:'Collector D',lotId:'LOT-2032',amount:4070,method:'UPI',status:'Pending'}
  ],
  intake: [ ['Received',126,100], ['Sorted',94,75], ['Processing',61,48], ['Completed / Recycled',39,31] ],
  inventory: [ ['PCB',182,'+18% this week'], ['Cables',246,'+11% this week'], ['Battery',96,'+7% this week'], ['LCD',121,'+14% this week'] ],
  analytics: [ ['Mon',72],['Tue',94],['Wed',81],['Thu',116],['Fri',102],['Sat',138],['Sun',126] ]
};
export default dashboardData;
