<template>
  <div>
    <ul>
      <!-- :class="{ 'tree-level-down': treeLevel }" -->

      <li
        v-for="node in list"
        :key="node.id"
        class="node__list"
        :style="{ 'margin-left': !node.children.length ? '2.8rem' : '1rem' }"
      >
        <div class="d-flex">
          <button @click="expanded = !expanded" v-if="node.children.length">
            <ArrowRight v-if="!expanded" />
            <ArrowDown v-else />
          </button>
          <div class="node__content">
            <span class="node__name">{{ node.name }}</span>
            <div class="node__actions">
              <button
                @click="showEditModal(node.id)"
                class="node__action node__action--edit"
              >
                <EditOutline />
              </button>
              <button
                @click="$bvModal.show(`modal-${node.id}`)"
                class="node__action node__action--add"
              >
                <AddPlus />
              </button>
              <button
                @click="handleDeleteDetail(node.id)"
                class="node__action node__action--delete"
              >
                <DeleteOutline />
              </button>
            </div>
          </div>
        </div>

        <BaseTreeView
          v-if="expanded && node.children.length"
          tree-level
          :list="detailsByNodeId(node.id)"
        />

        <b-modal :id="`modal-${node.id}`">
          <template #modal-title> Добавить новую деталь </template>
          <b-form @submit="handleSubmit(node.id)">
            <b-form-group
              id="input-group-name"
              label="Название"
              label-for="input-name"
              description="Поле ввода название детали"
            >
              <b-form-input
                id="input-name"
                v-model.trim="form.name"
                type="text"
                placeholder="Кузов"
                required
              >
              </b-form-input>
            </b-form-group>

            <b-form-group
              id="input-group-price"
              label="Цена"
              label-for="input-price"
              description="Поле ввода цены детали ($)"
            >
              <b-form-input
                id="input-price"
                v-model.number="form.price"
                type="number"
                placeholder="500"
                required
                min="0"
                max="9999999"
              >
              </b-form-input>
            </b-form-group>

            <b-form-group
              id="input-group-quantity"
              label="Количество"
              label-for="input-quantity"
              :description="`Поле ввода кол-во детали (1-20): ${form.quantity}`"
            >
              <b-form-input
                id="input-quantity"
                v-model.number="form.quantity"
                min="1"
                max="30"
                type="range"
              />
            </b-form-group>
          </b-form>
          <template #modal-footer>
            <b-button
              variant="outline-danger"
              class="mt-3"
              @click="$bvModal.hide(`modal-${node.id}`)"
            >
              Отмена
            </b-button>
            <b-button
              variant="success"
              class="mt-3"
              @click="handleSubmit(node.id)"
            >
              Создать
            </b-button>
          </template>
        </b-modal>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import Vue, { PropType } from "vue";
import CarDetail from "@/shared/models/detail";
import { mapGetters } from "vuex";
import ArrowRight from "@/components/icons/ArrowRight.vue";
import ArrowDown from "@/components/icons/ArrowDown.vue";
import AddPlus from "@/components/icons/AddPlus.vue";
import DeleteOutline from "@/components/icons/DeleteOutline.vue";
import EditOutline from "@/components/icons/EditOutline.vue";

export default Vue.extend({
  components: {
    ArrowRight,
    ArrowDown,
    AddPlus,
    DeleteOutline,
    EditOutline,
  },
  props: {
    list: {
      type: Array as PropType<Array<CarDetail>>,
      required: true,
    },
    treeLevel: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
  data() {
    return {
      expanded: false,
      form: {
        name: null,
        price: null,
        quantity: 1,
      },
      editMode: false,
    };
  },
  computed: {
    ...mapGetters([
      "detailsByParentId",
      "childDetailsByParentId",
      "detailById",
    ]),
  },
  methods: {
    detailsByNodeId(id: string): CarDetail[] {
      return this.detailsByParentId(id);
    },
    handleSubmit(nodeId: string) {
      if (this.editMode) {
        const updatedDetail = {
          name: this.form.name,
          _price: this.form.price,
          quantity: this.form.quantity,
        };
        this.$store.dispatch("updateDetail", {
          id: nodeId,
          data: updatedDetail,
        });
        this.editMode = false;
        this.$bvModal.hide(`modal-${nodeId}`);
      } else {
        this.$store.dispatch("createDetail", {
          parentId: nodeId,
          data: { ...this.form },
        });
        this.reset();
        this.$bvModal.hide(`modal-${nodeId}`);
      }
    },
    reset() {
      this.form.name = this.form.price = null;
      this.form.quantity = 1;
    },
    handleDeleteDetail(id: string) {
      this.$store.dispatch("deleteDetail", { id });
    },
    showEditModal(nodeId: string) {
      this.editMode = true;
      this.$bvModal.show(`modal-${nodeId}`);
      const detail = this.detailById(nodeId);
      this.form.name = detail.name;
      this.form.price = detail._price;
      this.form.quantity = detail.quantity;
    },
  },
});
</script>

<style lang="scss">
.node {
  display: flex;
  flex-direction: column;

  &__list {
    margin-top: 0.5rem;
  }

  &__content {
    display: flex;
    align-items: center;
    gap: 1rem;
  }

  &__actions {
    display: flex;
    gap: 0.5rem;
  }

  &__action {
    display: flex;
    justify-content: center;
    align-items: center;

    padding: 0.2rem;
    border-radius: 7px;
    transition: all 0.2s;

    &--add {
      color: #22c55e;
      background-color: #bbf7d0;

      &:hover {
        background-color: #86efac;
      }
    }

    &--delete {
      color: #ef4444;
      background-color: #fecaca;

      &:hover {
        background-color: #fca5a5;
      }
    }

    &--edit {
      color: #3b82f6;
      background-color: #bfdbfe;

      &:hover {
        background-color: #7dd3fc;
      }
    }
  }
}
</style>
