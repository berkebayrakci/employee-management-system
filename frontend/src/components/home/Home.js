import React, { Component } from 'react';
import { Container, Dimmer, Grid, Icon, Loader, Segment, Statistic } from 'semantic-ui-react';
import { emsApi } from '../misc/EmsApi';
import { handleLogError } from '../misc/Helpers'

class Home extends Component {

    state = {
        numberOfEmployees: 0 ,
        isLoading: false    }
    async componentDidMount(){
        this.setState({ isLoading: true })
        try{
            let response = await emsApi.numberOfEmployees()
            const numberOfEmployees = response.data
            this.setState({ numberOfEmployees })
        } catch(error) {
            handleLogError(error)
        } finally{
            this.setState( {isLoading : false} )
        }}
    render(){
        const { isLoading } = this.state
        if(isLoading){
            return(
                <Segment basic style={{ marginTop: window.innerHeight / 2}}>
                    <Dimmer active inverted>
                        <Loader inverted size='huge'> Loading </Loader>
                    </Dimmer>
                </Segment>
            )    }
        else{
            const {numberOfEmployees} = this.state;
            return(
                <Container text>
                    <Grid stackable columns={1}>
                        <Grid.Row>
                            <Grid.Column textAlign='center'>
                                <Segment color='blue'>
                                    <Statistic>
                                        <Statistic.Value><Icon name='user' color='grey' />{numberOfEmployees}</Statistic.Value>
                                        <Statistic.Label> Employees </Statistic.Label>
                                    </Statistic>
                                </Segment>
                            </Grid.Column>
                        </Grid.Row>
                    </Grid>
                </Container>
            )}}}
export default Home