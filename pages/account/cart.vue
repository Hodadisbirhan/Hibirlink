<template>
  <main class="w-full h-full max-w-[90rem] mx-auto px-5">
    <h-notification
      @close="notification.show = false"
      :success="notification.status"
      v-model="notification.show"
    >
      {{ notification.content }}
    </h-notification>

    <h-bread-crumb />

    <section class="w-full h-full flex lg:flex-row flex-col gap-8">
      <div class="flex-auto flex flex-col gap-6">
        <h2
          class="font-bold text-base md:text-lg text-neutral200 bg-light400 px-3 py-3 rounded-md bg-opacity-50"
        >
          Items in Cart
        </h2>

        <div v-if="loading" class="w-full h-full space-y-4">
          <h-skeleton-loader v-for="i in 5" :key="i">
            <div class="flex gap-4 w-full">
              <div class="w-36 h-37 rounded bg-neutral500"></div>
              <div class="space-y-2 flex-1">
                <div class="w-2/4 h-6 rounded bg-neutral500"></div>
                <div class="w-3/4 h-6 rounded bg-neutral500"></div>
                <div class="w-full h-6 rounded bg-neutral500"></div>
                <div class="w-4/6 h-6 rounded bg-neutral500"></div>
                <div class="w-full h-6 rounded bg-neutral500"></div>
              </div>
            </div>
          </h-skeleton-loader>
        </div>
        <div
          v-else-if="carts?.length == 0"
          class="flex flex-col items-center justify-center gap-4 font-extrabold text-lg text-neutral200"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            x="0px"
            y="0px"
            width="100"
            height="100"
            viewBox="0 0 128 128"
          >
            <circle cx="84" cy="117" r="7" fill="#fff"></circle>
            <circle cx="44" cy="117" r="7" fill="#fff"></circle>
            <path
              fill="#fff"
              d="M47,24h70.3c4.8,0,8.2,4.7,6.6,9.2l-13.7,41.2c-1.9,5.7-7.3,9.6-13.3,9.6H37L47,24z"
            ></path>
            <path
              fill="#444b54"
              d="M84,127c-5.5,0-10-4.5-10-10c0-2.7,1-5.2,2.9-7.1c1.2-1.2,3.1-1.2,4.2,0c1.2,1.2,1.2,3.1,0,4.2 c-0.8,0.8-1.2,1.8-1.2,2.8c0,2.2,1.8,4,4,4s4-1.8,4-4c0-1.7,1.3-3,3-3s3,1.3,3,3C94,122.5,89.5,127,84,127z"
            ></path>
            <path
              fill="#444b54"
              d="M91,110.5c-1.7,0-3-1.3-3-3c0-3.6-2.9-6.5-6.5-6.5H44c-5.5,0-10-4.5-10-10s4.5-10,10-10h52.9 c4.7,0,8.9-3,10.4-7.5l13.7-41.2c0.4-1.2,0.2-2.5-0.5-3.6s-1.9-1.7-3.2-1.7H47c-1.7,0-3-1.3-3-3v-7h-7c-1.7,0-3-1.3-3-3s1.3-3,3-3 h10c1.7,0,3,1.3,3,3v7h67.3c3.3,0,6.2,1.5,8.1,4.2c1.9,2.6,2.4,5.9,1.4,9L113,75.4c-2.3,7-8.8,11.6-16.1,11.6H44c-2.2,0-4,1.8-4,4 s1.8,4,4,4h37.5c6.9,0,12.5,5.6,12.5,12.5C94,109.1,92.7,110.5,91,110.5z"
            ></path>
            <path
              fill="#71c2ff"
              d="M35,47H15c-1.7,0-3-1.3-3-3s1.3-3,3-3h20c1.7,0,3,1.3,3,3S36.7,47,35,47z"
            ></path>
            <path
              fill="#71c2ff"
              d="M50,67H20c-1.7,0-3-1.3-3-3s1.3-3,3-3h30c1.7,0,3,1.3,3,3S51.7,67,50,67z"
            ></path>
            <path
              fill="#71c2ff"
              d="M4,67c-0.2,0-0.4,0-0.6-0.1c-0.2,0-0.4-0.1-0.6-0.2c-0.2-0.1-0.3-0.2-0.5-0.3c-0.2-0.1-0.3-0.2-0.4-0.4 C1.3,65.6,1,64.8,1,64s0.3-1.6,0.9-2.1c0.1-0.1,0.3-0.3,0.4-0.4c0.2-0.1,0.3-0.2,0.5-0.3c0.2-0.1,0.4-0.1,0.6-0.2 c0.4-0.1,0.8-0.1,1.2,0c0.2,0,0.4,0.1,0.6,0.2c0.2,0.1,0.4,0.2,0.5,0.3c0.2,0.1,0.3,0.2,0.4,0.4C6.7,62.4,7,63.2,7,64 s-0.3,1.6-0.9,2.1c-0.1,0.1-0.3,0.3-0.4,0.4c-0.2,0.1-0.3,0.2-0.5,0.3c-0.2,0.1-0.4,0.1-0.6,0.2C4.4,67,4.2,67,4,67z"
            ></path>
            <path
              fill="#444b54"
              d="M44,127c-5.5,0-10-4.5-10-10s4.5-10,10-10s10,4.5,10,10S49.5,127,44,127z M44,113c-2.2,0-4,1.8-4,4s1.8,4,4,4 s4-1.8,4-4S46.2,113,44,113z"
            ></path>
          </svg>
          <h4>Empty Cart</h4>
        </div>

        <div v-else class="w-full h-full space-y-4">
          <account-cart
            v-for="(cart, i) in carts"
            :key="i"
            :cart="cart"
            @notify="handleNotify"
            @deletecart="
              () => {
                refetch();
                updatePrice();
              }
            "
            @updatequantity="
              () => {
                updatePrice();
              }
            "
          />
        </div>
      </div>

      <div
        class="lg:w-2/5 w-full h-fit bg-light400 bg-opacity-50 gap-4 flex flex-col p-4 rounded-xl"
      >
        <h3 class="text-neutral200 text-base md:text-lg font-bold">
          Cart total
        </h3>
        <div class="flex items-center justify-between text-neutral100">
          <div>
            <h4 class="font-semibold">Item(s) Payable</h4>
            <p class="text-sm">(excluding transaction fee and tax)</p>
          </div>
          <h3 class="font-extrabold text-neutral200">{{ payable }} ETB</h3>
        </div>
        <div class="flex items-center justify-between text-neutral100">
          <h4 class="font-semibold">Transaction Fee</h4>
          <h3 class="font-extrabold text-neutral200">3%</h3>
        </div>
        <hr class="border-lemon border-opacity-20" />

        <div class="flex items-center justify-between text-dark100">
          <div>
            <h4 class="font-semibold">Item(s) Total Payable</h4>
            <p class="text-sm">(including transaction fee and tax)</p>
          </div>
          <h3 class="font-extrabold">{{ totalPayable }} ETB</h3>
        </div>

        <button
          type="button"
          @click="($event) => mutate({ userId: store.uid })"
          class="inline-block text-center rounded-full bg-primaryvar1 px-6 py-2 font-bold leading-normal text-light300 shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primaryvar1 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
        >
          <Icon
            name="material-symbols:shopping-cart-checkout-outline-rounded"
          />
          Checkout
        </button>
      </div>
    </section>
  </main>
</template>

<script setup lang="ts">
import get_cart from "~/apollo/query/account/cart.gql";
import cart_payable from "~/apollo/query/account/payable.gql";
import check_cart from "~/apollo/mutation/account/check_cart.gql";
import { useAuth } from "~~/store/auth";

type NotificationType = {
  show?: boolean;
  status?: boolean;
  content?: string;
};
const notification = reactive({
  show: false,
  status: false,
  content: "notification",
});

const handleNotify = (show: boolean, status: boolean, content: string) => {
  notification.show = show;
  notification.status = status;
  notification.content = content;
};

const store = useAuth();
const router = useRouter();
const { refetch, error, result, loading } = useCustomQuery(get_cart, {
  userId: store.uid,
});
const carts = computed(() => result.value?.cart);
const getProductPrice = (cart: any): number => {
  let price: number = cart?.product?.unit_price;
  if (cart?.product?.discount) {
    price -= cart?.product?.discount;
  }
  if (cart?.product?.special_discount) {
    price *= 1 - cart?.product?.special_discount?.rate / 100;
  }
  return price;
};

const {
  refetch: updatePrice,
  result: priceResult,
  loading: priceLoading,
  error: priceError,
} = useCustomQuery(cart_payable, { userId: store.uid });

const payable = computed(() => priceResult.value?.user?.total_price ?? 0);
const totalPayable = computed(() => payable.value + payable.value * 0.03);

const { mutate, onDone, onError } = useCustomMutation(check_cart);
onDone(({ data }) => {
  if (totalPayable.value > 0) router.push({ name: "account-checkout-and-pay" });
  else {
    notification.show = true;
    notification.status = false;
    notification.content = "You have an empty cart!";
  }
});
onError((error) => {
  notification.show = true;
  notification.status = false;
  notification.content =
    "Please cross check your cart! It might contain a Qt less or more than allowed.";
});

useHead({
  title: "Cart",
});

definePageMeta({
  layout: "custom",
  middleware: "before-entry",
});
</script>

<style scoped>
/* Chrome, Safari, Edge, Opera */
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

/* Firefox */
input[type="number"] {
  -moz-appearance: textfield;
}
</style>
