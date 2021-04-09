<template>
    <section class="section">
        <b-table
            :data="data"
            :columns="columns">
        </b-table>
        <hr />
        <p>You can debounce search filter to avoid multiple filtering when typing.</p>
        <b-table
            :data="data"
            :columns="columns"
            :debounce-search="1000">
        </b-table>
        <p>You can also customize the search input using a scoped slot.</p>
        <b-table
            :data="data">
            <template v-for="column in columns">
                <b-table-column :key="column.id" v-bind="column">
                    <template
                        v-if="column.searchable && !column.numeric"
                        #searchable="props">
                        <b-input
                            v-model="props.filters[props.column.field]"
                            placeholder="Search..."
                            icon="magnify"
                            size="is-small" />
                    </template>
                    <template v-slot="props">
                        {{ props.row[column.field] }}
                    </template>
                </b-table-column>
            </template>
        </b-table>
    </section>
</template>

<script>
export default {

}
</script>

<style>

</style>