import React, { useRef, useState, useCallback, Component } from "react";
import { FormLayout, Page, TextField, AppProvider, Frame, Card, TextContainer, SkeletonDisplayText, SkeletonBodyText, SkeletonPage, ContextualSaveBar, ActionList, Loading, Toast, Navigation, TopBar, Layout } from '@shopify/polaris';
import { HomeMajor, CustomersMajor, ArrowLeftMinor } from '@shopify/polaris-icons';
import Dashboard from './Dashboard'
import Customers from './Customers'
import ls from 'local-storage';
import { useHistory } from "react-router-dom";

import {
    BrowserRouter as Router,
    Switch,
    Route,
} from "react-router-dom";

export default function FrameExample() {
    const defaultState = useRef({
        emailFieldValue: 'admin@bchallenge.com',
        nameFieldValue: 'admin',
    });
    const skipToContentRef = useRef(null);

    const history = useHistory();
    const [toastActive, setToastActive] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [isDirty, setIsDirty] = useState(false);
    const [userMenuActive, setUserMenuActive] = useState(false);
    const [mobileNavigationActive, setMobileNavigationActive] = useState(false);
    const [modalActive, setModalActive] = useState(false);
    const [nameFieldValue, setNameFieldValue] = useState(
        defaultState.current.nameFieldValue,
    );
    const [emailFieldValue, setEmailFieldValue] = useState(
        defaultState.current.emailFieldValue,
    );
    const [storeName, setStoreName] = useState(
        defaultState.current.nameFieldValue,
    );

    const handleDiscard = useCallback(() => {
        setEmailFieldValue(defaultState.current.emailFieldValue);
        setNameFieldValue(defaultState.current.nameFieldValue);
        setIsDirty(false);
    }, []);
    const handleSave = useCallback(() => {
        defaultState.current.nameFieldValue = nameFieldValue;
        defaultState.current.emailFieldValue = emailFieldValue;

        setIsDirty(false);
        setToastActive(true);
        setStoreName(defaultState.current.nameFieldValue);
    }, [emailFieldValue, nameFieldValue]);

    const toggleToastActive = useCallback(
        () => setToastActive((toastActive) => !toastActive),
        [],
    );
    const toggleUserMenuActive = 
        () => {setUserMenuActive((userMenuActive) => !userMenuActive);}

    const handleOnLogoutClick = () => {ls.clear(); history.push('')}

    const toggleMobileNavigationActive = useCallback(
        () =>
            setMobileNavigationActive(
                (mobileNavigationActive) => !mobileNavigationActive,
            ),
        [],
    );


    const openDashboard = function () {
        actualPageMarkup = <Dashboard></Dashboard>
    }

    const openCustomers = function () {
        actualPageMarkup = <Customers></Customers>
    }

    const toastMarkup = toastActive ? (
        <Toast onDismiss={toggleToastActive} content="Changes saved" />
    ) : null;

    const userMenuActions = [
        {
            items: [{ content: 'LOGOUT', onAction: handleOnLogoutClick }],
        },
    ];

    const contextualSaveBarMarkup = isDirty ? (
        <ContextualSaveBar
            message="Unsaved changes"
            saveAction={{
                onAction: handleSave,
            }}
            discardAction={{
                onAction: handleDiscard,
            }}
        />
    ) : null;

    const userMenuMarkup = (
        <TopBar.UserMenu
            actions={userMenuActions}
            name="Admin"
            initials="A"
            open={userMenuActive}
            onToggle={toggleUserMenuActive}
        />
    );



    const topBarMarkup = (
        <TopBar
            showNavigationToggle
            userMenu={userMenuMarkup}
            onNavigationToggle={toggleMobileNavigationActive}
        />
    );

    const navigationMarkup = (
        <Navigation location="/">

            <Navigation.Section
                separator
                title="Admin Panel"
                items={[
                    {
                        url: '/admin/dashboard',
                        label: 'Dashboard',
                        icon: HomeMajor,
                        onClick: openDashboard,
                    },
                    {
                        url: '/admin/customers',
                        label: 'Customers',
                        icon: CustomersMajor,
                        onClick: openCustomers,
                    },
                ]}

            />
        </Navigation>
    );

    const loadingMarkup = isLoading ? <Loading /> : null;

    var actualPageMarkup = <Router>
        <Switch>
            <Route exact path="/admin/dashboard">
                <Dashboard></Dashboard>
            </Route>
            <Route path="/admin/customers">
                <Customers></Customers>
            </Route>
        </Switch>
    </Router>;

    const loadingPageMarkup = (
        <SkeletonPage>
            <Layout>
                <Layout.Section>
                    <Card sectioned>
                        <TextContainer>
                            <SkeletonDisplayText size="small" />
                            <SkeletonBodyText lines={9} />
                        </TextContainer>
                    </Card>
                </Layout.Section>
            </Layout>
        </SkeletonPage>
    );

    const pageMarkup = isLoading ? loadingPageMarkup : actualPageMarkup;



    const theme = {
        logo: {
            width: 124,
            topBarSource:
                'https://cdn.shopify.com/s/files/1/0487/9794/1913/files/Basma_logo_bigger_file.png?v=1600787952',
            url: 'http://basma.com',
            accessibilityLabel: '',
        },
    };

    return (
        <div style={{ height: '500px' }}>
            <AppProvider
                theme={theme}
                i18n={{
                    Polaris: {
                        Avatar: {
                            label: 'Avatar',
                            labelWithInitials: 'Avatar with initials {initials}',
                        },
                        ContextualSaveBar: {
                            save: 'Save',
                            discard: 'Discard',
                        },
                        TextField: {
                            characterCount: '{count} characters',
                        },
                        TopBar: {
                            toggleMenuLabel: 'Toggle menu',


                        },
                        Modal: {
                            iFrameTitle: 'body markup',
                        },
                        Frame: {
                            skipToContent: 'Skip to content',
                            Navigation: {
                                closeMobileNavigationLabel: 'Close navigation',
                            },
                        },
                    },
                }}
            >
                <Frame
                    topBar={topBarMarkup}
                    navigation={navigationMarkup}
                    showMobileNavigation={mobileNavigationActive}
                    onNavigationDismiss={toggleMobileNavigationActive}
                    skipToContentTarget={skipToContentRef.current}
                >
                    {contextualSaveBarMarkup}
                    {loadingMarkup}
                    {pageMarkup}
                    {toastMarkup}
                </Frame>
            </AppProvider>
        </div>
    );
}
