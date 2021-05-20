<template>
  <div class="welcome">
    <img src="@/assets/billfin.svg" alt="BillFin logo" class="logo" />
    <h1 style="display: inline-block" class="greeting">Hi Yectra!</h1>
  </div>

  <h3 class="message">
    Thanks for all your hard work for Redi2. Good luck on the BillFin v2
    project!
  </h3>
</template>

<style lang="scss" scoped>
.welcome {
  display: flex;
  align-content: center;
  text-align: center;
  margin-top: 40px;

  color: #5f5f5f;
  .logo {
    margin: 0 40px;
  }

  .greeting {
    color: #5f5f5f;
    font-weight: 500;
    margin: auto 0px;
  }
}

.message {
  color: #5f5f5f;
  font-weight: 300;
  margin-top: 30px;
  margin-left: 140px;
}
</style>
