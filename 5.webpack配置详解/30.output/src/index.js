import add from './add'
console.log(add);
add(2,3)
console.log('add(2,3)', add(2,3))

import('./add').then((ele) => {
  console.log(ele);
  
})