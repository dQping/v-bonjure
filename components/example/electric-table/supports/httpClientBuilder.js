import Http from '@core/Http';

export default function buildHttpClient({ headers = {}, context }) {
    return Http.getClient().headers(headers).disableLoading().before(client => {
        context && context.$set(context, 'loading', true);
    }).complete(() => {
        context && context.$set(context, 'loading', false);
    });
};