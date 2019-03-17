import electricSelect from '@core/components/example/electric-select/index.vue';
import * as localStorageHelper from '../../../../utils/localStorageHelper';
import formGroup from '@core/components/example/form-group/index.vue';

export default {
    data() {
        return {
            selectValue1: '',
            remote: {
                url() {
                    return '/users';
                },
                headers() {
                    return {
                        token: localStorageHelper.get('token')
                    };
                },
                queryParams() {
                    return {
                        pageSize: 10,
                        pageNumber: 1
                    };
                }
            },
            filterParams({ filterText }) {
                return {
                    username: filterText
                };
            },
            dataSourceFormatter(response) {
                return response.data.userList;
            },
            textExtractor(data) {
                return data['name'];
            },
            valueExtractor(data) {
                return data['name'];
            }
        };
    },
    components: {
        'form-group': formGroup,
        'electric-select': electricSelect
    }
};