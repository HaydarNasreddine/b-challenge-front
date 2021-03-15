import React, { useEffect, useState } from "react";
import { Heading, Layout, Page, Card } from '@shopify/polaris';
import { apis } from "../../apis";
import apirequest from "../../library/apirequest";
import './style/Dashboard.css';

export default function AdminDashboard() {

    const [average, setAverage] = useState({});

    function getAverage() {
        apirequest(apis.customer.average, {
            token: true,
            sCall: function (result) {
                setAverage(result.data);
            }
        });
    }

    useEffect(() => getAverage(), []);

    return <Page title="Subscription Average">
        <br></br>
        <br></br>
        <Layout>
            <Layout.Section oneThird>
                <Card title="Last 24 hours" sectioned>
                    <p className="average-number">{average.last24Hours}</p>
                </Card>
            </Layout.Section>
            <Layout.Section oneThird>
                <Card title="Last Week" sectioned>
                    <p className="average-number">{average.lastWeek}</p>
                </Card>
            </Layout.Section>
            <Layout.Section oneThird>
                <Card title="Last Month" sectioned>
                    <p className="average-number">{average.lastMonth}</p>
                </Card>
            </Layout.Section>
            <Layout.Section oneThird>
                <Card title="Last 3 Months" sectioned>
                    <p className="average-number">{average.last3Months}</p>
                </Card>
            </Layout.Section>
            <Layout.Section oneThird>
                <Card title="Last year" sectioned>
                    <p className="average-number">{average.lastYear}</p>
                </Card>
            </Layout.Section>
        </Layout>
    </Page>
}