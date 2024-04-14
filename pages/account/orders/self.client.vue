<template>
  <main class="mt-5">
    <h-notification
      :success="success"
      :message="message"
      v-model="show_notification" />
    <h-loading :showLoading="onFetchProductLoading"></h-loading>
    <h-tab
      @activeTabNameChange="handleTabChange"
      :tabs="tabs as []"
      tabs-class="sticky z-40 top-[3.7rem] left-0 right-0 pt-1 justify-center">
      <template #pending>
        <section class="flex flex-col gap-4 px-3 xs:mt-8 mt-12">
          <h3 class="self-center"></h3>
          <div class="flex relative lg:flex-row flex-col-reverse gap-4">
            <div
              class="h-fit max-h-[50vh] overflow-y-auto flex-1 border-r sticky top-0 left-0 sm:min-w-[24rem] min-w-full grid lg:grid-cols-1 md:grid-cols-2 gap-4">
              <div
                v-for="order in pending_per_order"
                :key="order?.id"
                class="flex h-fit rounded shadow-sm items-center cursor-pointer justify-start transition-colors ease-in-out duration-300"
                @click="
                  () => {
                    show_detail(order);
                    show = true;
                  }
                "
                :class="[
                  selected_order?.order_id === order?.order_id
                    ? 'lg:bg-primary bg-neutral300'
                    : 'hover:bg-primaryvar3 bg-neutral300',
                ]">
                <p
                  class="font-semibold px-1.5 flex items-center justify-center text-light400"
                  title="Expand"
                  git
                  pu>
                  <Icon
                    name="mdi:progress-check"
                    class="w-7 h-7" />
                </p>
                <div
                  class="px-2.5 py-1.5 flex bg-light400 rounded-r-sm flex-auto items-start justify-between gap-8">
                  <div>
                    <h3 class="font-extrabold mb-1.5 rounded text-primary">
                      Order Id {{ order?.order_id }}
                    </h3>
                    <h4
                      class="font-semibold text-md flex items-center gap-2 text-neutral300">
                      <Icon
                        name="uil:calender"
                        class="text-lg font-semibold text-primaryvar1" />
                      {{ formatDateUtils(order.created_at) }}
                    </h4>
                  </div>
                  <div class="flex flex-col items-end">
                    <!-- <h2 class="font-extrabold text-lg text-neutral300">
                      {{ getTotalPrice(order.order_details) }} {{ $t("etb") }}
                    </h2> -->
                  </div>
                </div>
              </div>
            </div>
            <div
              class="lg:w-[60%] lg:block invisible h-[30rem]"
              v-if="!is_selected">
              Please Select The order inorder to see their detail
            </div>
            <div class="flex flex-col gap-5 w-full">
              <div
                class="w-full lg:max-w-[80%] sticky flex flex-col overflow-y-auto"
                v-for="item in store_ids"
                :key="item">
                <order-detail
                  v-if="item"
                  @get-scanned-value="handleUpdate"
                  v-model:showBottomSheet="show"
                  :order="singleOrder(selected_order?.order_id, item)"
                  ref="bottomSheetTarget"
                  orderType="PENDING" />
              </div>
            </div>
          </div>
        </section>
      </template>

      <template #completed>
        <section class="flex flex-col gap-4 px-3 xs:mt-8 mt-12">
          <h3 class="self-center"></h3>
          <div class="flex relative lg:flex-row flex-col-reverse gap-4">
            <div
              class="h-fit flex-1 sm:min-w-[24rem] min-w-full grid lg:grid-cols-1 md:grid-cols-2 gap-4">
              <h-empty
                v-if="activeTabOrders.length === 0"
                content="Result Not Found"></h-empty>
              <div
                @click="
                  () => {
                    show_detail(order);
                    show = true;
                  }
                "
                v-for="order in pending_per_order"
                :key="order?.id"
                class="flex h-fit rounded shadow-sm items-center cursor-pointer justify-start transition-colors ease-in-out duration-300"
                :class="[
                  selected_order?.order_id === order?.order_id
                    ? 'lg:bg-primary bg-neutral300'
                    : 'hover:bg-primaryvar3 bg-neutral300',
                ]">
                <p
                  class="font-semibold px-1.5 flex items-center justify-center text-light400"
                  title="Expand"
                  git
                  pu>
                  <Icon
                    name="mdi:progress-check"
                    class="w-7 h-7" />
                </p>
                <div
                  class="px-2.5 py-1.5 flex bg-light400 rounded-r-sm flex-auto items-start justify-between gap-8">
                  <div class="flex flex-col gap-6">
                    <h3 class="font-extrabold mb-1.5 rounded text-primary">
                      Order Id {{ order?.order_id }}
                    </h3>

                    <h4 class="font-semibold text-sm text-neutral300">
                      <Icon
                        name="uil:calender"
                        class="text-lg font-semibold text-primaryvar1" />
                      {{ formatDateUtils(order.created_at) }}
                    </h4>
                  </div>
                  <div class="flex flex-col items-end"></div>
                </div>
              </div>
            </div>

            <div
              class="lg:w-[60%] lg:block invisible h-[30rem]"
              v-if="show">
              Please Select The order inorder to see their detail
            </div>
            <div
              @click="
                () => {
                  show_detail(order);
                  show = true;
                }
              "
              class="w-full sticky overflow-y-auto lg:min-w-[60%]"
              v-for="item in store_ids"
              :key="item">
              <order-detail
                v-if="item"
                v-model:showBottomSheet="show"
                :order="singleOrder(selected_order?.order_id, item)"
                ref="bottomSheetTarget"
                orderType="COMPLETED" />
            </div>
          </div>
        </section>
      </template>

      <template #delivered>
        <section class="flex flex-col gap-4 px-3 xs:mt-8 mt-12">
          <h3 class="self-center"></h3>
          <div class="flex relative lg:flex-row flex-col-reverse gap-4">
            <div
              class="h-fit flex-1 sm:min-w-[24rem] min-w-full grid lg:grid-cols-1 md:grid-cols-2 gap-4">
              <h-empty
                v-if="pending_per_order?.length === 0"
                content="Result Not Found"></h-empty>
              <div
                v-for="order in pending_per_order"
                :key="order?.id"
                @click="
                  () => {
                    show_detail(order);
                    show = true;
                  }
                "
                class="flex h-fit rounded shadow-sm items-center cursor-pointer justify-start transition-colors ease-in-out duration-300"
                :class="[
                  controller.activeOrder?.order_id === order?.order_id
                    ? 'lg:bg-primary bg-neutral300'
                    : 'hover:bg-primaryvar3 bg-neutral300',
                ]">
                <p
                  class="font-semibold px-1.5 flex items-center justify-center text-light400"
                  title="Expand"
                  git
                  pu>
                  <Icon
                    name="mdi:progress-check"
                    class="w-7 h-7" />
                </p>
                <div
                  class="px-2.5 py-1.5 flex bg-light400 flex-col rounded-r-sm flex-auto items-start justify-between gap-8">
                  <div>Order Id {{ order?.order_id }}</div>
                  <div class="flex flex-col">
                    <h4 class="font-semibold text-sm text-neutral300">
                      {{ formatDateUtils(order.created_at) }}
                    </h4>
                  </div>
                </div>
              </div>
            </div>

            <div
              class="lg:w-[60%] lg:block invisible h-[30rem]"
              v-if="!is_selected">
              Please Select The order inorder to see their detail
            </div>
            <div
              class="w-full sticky overflow-y-auto lg:min-w-[60%]"
              v-for="item in store_ids"
              :key="item">
              <order-detail
                v-if="item"
                v-model:showBottomSheet="show"
                :order="singleOrder(selected_order?.order_id, item)"
                ref="bottomSheetTarget"
                orderType="COMPLETED" />
            </div>
          </div>
        </section>
      </template>
    </h-tab>
  </main>
</template>
<script setup lang="ts">
import { useAuth } from "~~/store/auth";
import fetchProductOrderBySupplier from "@/apollo/query/account/fetchOrders.gql";
import useCustomQuery from "~~/composables/useCustomQuery";
import updateorder from "~/apollo/mutation/order/update_order_status.gql";
import { onClickOutside } from "@vueuse/core";
import { computed } from "@vue/reactivity";
const success = ref(false);
const show_notification = ref(false);
const message = ref("");
const tab_selected = ref("pending");
const is_selected = ref(false);
const selected_order = ref(null);
const searchString = ref("");
const getTotalPrice = (
  input: {
    unit_price: number;
    quantity: number;
    discount: number;
    special_discount_rate: number | number;
  }[]
) => {
  let price = 0;

  input.forEach((product) => {
    price +=
      (product.unit_price - (product.discount ? product.discount : 0)) *
      (1 -
        (product.special_discount_rate
          ? product.special_discount_rate / 100
          : 0)) *
      product.quantity;
  });

  return price;
};
const show = ref(false);

const { uid } = useAuth();
const variable = computed(() => {
  return {
    order_detail: {
      status: {
        _eq: tab_selected.value.toLocaleLowerCase(),
      },
    },

    where: {
      with_delivery: { _eq: false },
      customer_id: { _eq: uid },
      order_details: {
        status: {
          _eq: tab_selected.value.toLocaleLowerCase(),
        },
      },
    },
  };
});

const activeTabOrders = ref<
  Array<{
    customer_id: string;
    id: number;
    user: {
      first_name: string;
      last_name: string;
    };

    with_delivery: boolean;
    transaction_key: string;
    created_at: string;
    // delivery_provider: {
    //   name: string;
    // };
    order_details: {
      status: string;
      order_id: string;
      unit_price: number;
      quantity: number;
      discount: number;
      special_discount_rate: number | number;
      physical_product: {
        id: number;
        title: string;
        store: {
          name: string;
        };
      };
    }[];
  }>
>([]);

const orders = ref<
  Array<{
    customer_id: string;
    user: {
      first_name: string;
      last_name: string;
    };

    with_delivery: boolean;
    transaction_key: string;
    created_at: string;

    order_details: {
      status: string;
      order_id: string;
      unit_price: number;
      quantity: number;
      discount: number;
      special_discount_rate: number | number;
      physical_product: {
        id: number;
        title: string;
        status: string;
        store: {
          name: string;
        };
      };
    }[];
  }>
>([]);

const {
  onResult: onFetchProductOrderResult,
  onError: onFetchProductOrderError,
  loading: onFetchProductLoading,
  refetch: refetchOrder,
} = useCustomQuery(fetchProductOrderBySupplier, variable);

onFetchProductOrderResult((result) => {
  orders.value = result.data.product_order;
});

onFetchProductOrderError((error) => {
  console.log({ error });
});

const currentTab = ref("pending");

const tabs = computed(() => [
  {
    text: "pending",
    icon: "mdi:progress-check",
    badge: currentTab.value === "pending" && activeTabOrders.value.length,
  },
  {
    text: "completed",
    icon: "uil:check-circle",
    badge: currentTab.value === "completed" && activeTabOrders.value.length,
  },
  {
    text: "delivered",
    icon: "uil:check-circle",
    badge: currentTab.value === "delivered" && activeTabOrders.value.length,
  },
]);

const controller = ref<{ activeOrder: any; showBottomSheet: boolean }>({
  activeOrder: null,
  showBottomSheet: false,
});

const bottomSheetTarget = ref(null);
onClickOutside(bottomSheetTarget, (event) => {
  controller.value.showBottomSheet = false;
});

definePageMeta({
  validate: (route) => {
    const { token } = useAuth();
    if (token) return true;
    else return false;
  },
});

const {
  mutate: updateOrder,
  onDone: onDoneUpdating,
  onError: onErrorUpdateting,
} = useCustomMutation(updateorder);

// const displayLoading = ref(true);
const handleTabChange = (tabSelected: string) => {
  currentTab.value = tabSelected;
  is_selected.value = false;
  tab_selected.value = tabSelected;
};

const pending_per_order = computed(() => {
  return orders.value?.map((element) => {
    return {
      order_id: element?.id,
      created_at: element.created_at,
      store_ids: Array.from(
        new Set(
          element?.order_details?.map((detail) => {
            return detail?.physical_product?.store?.id;
          })
        )
      ),
    };
  });
});

useHead({
  title: "Orders",
});

const select_order_by = computed(() => {
  let single_order = orders.value?.find((order) => {
    return order?.id == controller.value.activeOrder?.order_id;
  });

  return single_order;
});
const store_ids = computed(() => {
  return pending_per_order.value?.find((element) => {
    return element?.order_id == selected_order?.value?.order_id;
  })?.store_ids;
});

const singleOrder = (id, store_id) => {
  is_selected.value = true;
  const data = orders.value?.find((element) => {
    return element?.id == id;
  });

  const detail = data?.order_details?.filter((element) => {
    return element?.physical_product?.store?.id == store_id;
  });
  return {
    order_details: detail,
    created_at: data?.created_at,
  };
};

const getProductPerStore = (store_ids: any) => {
  return store_ids?.map((s_id: any) => {
    return select_order_by.value?.order_details?.filter((element) => {
      return s_id == element?.physical_product?.store?.id;
    });
  });
};

//   selected_per_store_order.value = single_order?.order_details?.filter(
//     (o_d) => {
//       return o_d?.physical_product?.store?.id == controller?.value?.activeOrder?;
//     }
//   );
// });
onDoneUpdating((result) => {
  console.log("updated");
  refetchOrder();
  success.value = true;
  show_notification.value = true;
  message.value = "Your Operation Scanned Successfully";
});

onErrorUpdateting((error) => {
  success.value = false;
  show_notification.value = true;
  message.value = "Oops Please Try again";
});

const handleUpdate = (value: any) => {
  const splited_data = value.split("%$#@$%");
  const perpe = splited_data.slice(1);

  const id = perpe.map((element) => {
    return parseInt(element);
  });
  updateOrder({
    where: {
      id: {
        _in: id,
      },
    },
    set: {
      status: "delivered",
    },
  });
};

const show_detail = (value) => {
  selected_order.value = value;
};

definePageMeta({
  layout: "custom",
});
</script>
