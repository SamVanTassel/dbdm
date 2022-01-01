<script>
   import Selectors from './Selectors.svelte';

   export let selectedKit;
   export let nextKit;
   export let prevKit;
   export let hiddenDown;
   export let hiddenUp;

</script>

<div class="kitSelection">
   <div class ="kitDisplay"><div>Kit: </div><div>{selectedKit.name}</div></div>
   <Selectors up={nextKit} down={prevKit} {hiddenUp} {hiddenDown} />
 </div>

 <style>
   .kitSelection {
     width: 150px;
     display: grid;
     grid-template-columns: 4fr 1fr;
     padding-left: 10px;
     margin: 5px;
     border: 1px solid rgb(243, 220, 179, .75);
   }
   .kitDisplay {
     grid-column: 1;
     display: flex;
     align-items: center;
     justify-content: space-between;
     padding-right: 5px;
   }
 </style>