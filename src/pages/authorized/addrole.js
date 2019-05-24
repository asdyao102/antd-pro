import React, { Component } from 'react'
import {
    Form,
    Input,
    DatePicker,
    Select,
    Button,
    Card,
    InputNumber,
    Radio,
    Icon,
    Tooltip,
  } from 'antd';
  import { Checkbox } from 'antd';

const CheckboxGroup = Checkbox.Group;
  import { connect } from 'dva';
  import styles from './addrole.less';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
//FormattedMessage是不需要返回值的，formatMessage需要返回值，其实这个全球化对我来说作用不大，他就跟ecshop的那个
// language一样的性质，需要在src/locales下面调用
import { formatMessage, FormattedMessage } from 'umi-plugin-react/locale';
const FormItem = Form.Item;  
const { Option } = Select;
const { RangePicker } = DatePicker;
const { TextArea } = Input;
@connect(({ menu: menuModel,role}) => ({
    menuData: menuModel.menuData,
    role
  }),{
    addGoods:data=>(
      {
        type:'role/addrole3',
        data
      }
    )
  }
)
@Form.create()
class addrole extends Component {
  constructor(props){
    super(props)
 }  

  state = {
    checked: [],succ:this.props.role.succ
  };
  handleSubmit = (e) => {
      e.preventDefault();
      const { checked ,succ} = this.state;
      console.log('submit');
     
      this.props.form.validateFields((err, values) => {
        console.log(succ);
        console.log(values);
        if (!err) {
           this.props.addGoods(values);
           console.log(succ);
        }else{
          alert('err');
        }
      });  
    };
  render() {
    const { submitting ,menuData} = this.props;
    const {
      form: { getFieldDecorator, getFieldValue },
    } = this.props;
    const onTabChange = (checkedValues)=>{
        // const newcheck=[...this.state.checked]
        // newcheck.push(checkedValues)
        this.setState({ checked:checkedValues });
        //console.log(this.state.checked);
        // console.log(checkedValues)
    }
    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 7 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 12 },
        md: { span: 10 },
      },
    };

    const submitFormLayout = {
      wrapperCol: {
        xs: { span: 24, offset: 0 },
        sm: { span: 10, offset: 7 },
      },
    };  
    const plainOptions = menuData.map(
      menu=>({label:menu.name,value:menu.path.substr(1)})
      );
    
    
    return (
        <PageHeaderWrapper
        title={<FormattedMessage id="app.role.title" />}
        content={<FormattedMessage id="app.role.description" />}
       >
           <Card bordered={false}>
                <Form onSubmit={this.handleSubmit}  style={{ marginTop: 8 }}>
                    <FormItem {...formItemLayout} label={<FormattedMessage id="app.authorized.rolename" />}>
                    {getFieldDecorator('rolename', {
                        rules: [
                        {
                            required: true,
                            message: formatMessage({ id: 'app.authorized.mustrelo' }),
                        },
                        ],
                    })(<Input placeholder={formatMessage({ id: 'app.authorized.inputrole' })} />)}
                    </FormItem>
                    <FormItem
                    {...formItemLayout}
                    label={<FormattedMessage id="app.authorized.canadd" />}
                    help={<FormattedMessage id="app.authorized.adddes" />}
                    >
                    <div>
                        {/* 这里在getFieldDecorator里面用了initialValue，就不需要在CheckboxGroup里用defaultValue了 */}
                        {getFieldDecorator('action')(
                        <CheckboxGroup options={plainOptions}  onChange={onTabChange} />
                        )}
                    </div>
                    </FormItem>
                    {/* <ul>
                        {this.state.checked}
                    </ul> */}
                    <FormItem {...submitFormLayout} style={{ marginTop: 32 }}>
                    <Button type="primary" htmlType="submit">
                        <FormattedMessage id="form.submit" />
                    </Button>
                    {/* <Button style={{ marginLeft: 8 }}>
                        <FormattedMessage id="form.save" />
                    </Button> */}
                    </FormItem>
                </Form>
           </Card>
       </PageHeaderWrapper>
    )
  }
}
export default addrole;