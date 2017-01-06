<template>
  <form>
    <input name="id" type="hidden"></input>
    <input name="image"></input>
    <input name="memo"></input>
    <div class="status">
      <label>hp</label>
      <input name="hp"></input>
      <label>maxhp</label>
      <input name="max_hp"></input>
      <label>mp</label>
      <input name="mp"></input>
      <label>maxmp</label>
      <input name="max_mp"></input>
      <label>move</label>
      <input name="move"></input>
      <label>protection</label>
      <input name="protection"></input>
    </div>
    <div class="position">
      <label>x</label>
      <input name="x"></input>
      <label>y</label>
      <input name="y"></input>
    </div>
    <input type="submit">OK</input>
    <input type="submit">Cancel</input>
  </form>
</template>
