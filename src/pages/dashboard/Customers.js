import React, { useState, useCallback, useEffect, useReducer} from "react";
import { Form, Button, FormLayout, TextField, Select, Pagination, Page, Card, DataTable } from '@shopify/polaris';
import apirequest from "../../library/apirequest";
import { apis } from "../../apis";

export default function AdminCustomers() {
    const [customers, setCustomers] = useState([]);
    const [selected, setSelected] = useState('10');
    const [id, setId] = useState('');
    const [email, setEmail] = useState('');
    const [firstName, setFirstName] = useState('');
    const [total, setTotal] = useState('');
    const [page, setPage] = useState('1');
    const [lastPage, setLastPage] = useState('');
    const [, forceUpdate] = useReducer(x => x + 1, 0);
    const handleIdChange = useCallback(value => setId(value), []);
    const handleEmailChange = useCallback(value => setEmail(value), []);
    const handleFirstName = useCallback(value => setFirstName(value), []);
    // const handleSelectChange = useCallback(value => setSelected(value), []);
    const handleSelectChange = (value) => {
        setSelected(value);
    }

    var state = {}

    const getCustomers = function () {
        var param = buildParams();
        apirequest(apis.customer.filter, {
            params: param,
            token: true,
            sCall: function (result) {
                var rows = [];
                result.data.data.forEach(function (item) {
                    rows.push([item.id, item.first_name, item.last_name, item.email, item.created_at]);
                })
                setLastPage(result.data.last_page);
                setTotal(result.data.total);
                setCustomers(rows);
            }
        });
    }

    useEffect(() => getCustomers(), []);

    useEffect(() => {
        getCustomers()
    }, [page]);

    useEffect(() => {
        getCustomers()
    }, [selected]);

    const options = [
        { label: '10', value: '10' },
        { label: '60', value: '60' },
        { label: '100', value: '100' },
    ];




    const buildParams = function () {
        var array = [{ key: 'id', value: id }, { key: 'first_name', value: firstName }, { key: 'email', value: email }];
        var params = "?per_page=" + selected;
        if (page != 1) params += "&&page=" + page;
        array.forEach(function (item) {
            if (item.value.length > 0 && item.value != undefined)
                params += "&&" + item.key + "=" + item.value
        })
        return params;
    }

    const handleSubmit = (evt) => {
        evt.preventDefault();
        getCustomers()
    };

    return (
        <Page title="Manage Customers">
            <Form onSubmit={handleSubmit}>
                <FormLayout>
                    <FormLayout.Group condensed>
                        <Select
                            label="Page size"
                            options={options}
                            onChange={handleSelectChange}
                            value={selected}
                        />
                        <TextField label="Id" value={id} onChange={handleIdChange} />
                        <TextField label="First Name" value={firstName} onChange={handleFirstName} />
                        <TextField label="Email" name="email" value={email} onChange={handleEmailChange} />
                        <div>
                            <br></br>
                            <Button submit fullWidth>Filter</Button>
                        </div>

                    </FormLayout.Group>
                </FormLayout>
            </Form>

            <br></br>
            <Card>
                <DataTable
                    columnContentTypes={[
                        'text',
                        'text',
                        'text',
                        'text',
                        'text',
                    ]}
                    headings={[
                        'Id',
                        'First Name',
                        'Last Name',
                        'Email',
                        'Created At'
                    ]}
                    rows={customers}
                    defaultSortDirection="descending"
                    initialSortColumnIndex={4}
                />
            </Card>
            <br></br>
            <div style={{ float: 'right', height: '100px' }}>
                <Pagination
                    label={total + " Results"}
                    hasPrevious
                    onPrevious={() => {
                        if (page > 1) {
                            var p = parseInt(page)
                            setPage(p - 1)
                        }
                        else setPage(1);
                    }}
                    hasNext
                    onNext={() => {
                        if (page < lastPage) {
                            var p = parseInt(page)
                            setPage(p + 1)
                        }
                        else setPage(lastPage)
                    }}
                />
            </div>
        </Page>
    );

}