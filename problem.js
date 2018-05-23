// 每个node的属性与方法 {fn, child}
class Node {
    constructor() {
        // 为了方便验证结果, 每次创建的二叉树节点, 运算结果始终相同
        this.__randoms = (Math.random() * 50) - 30;
    }
    fn() {
        return this.__randoms;
    }
}

// 创建node关联
function createNodeChild(root, int) {
    int --;
    if (int > 0) {
        var nodeChildL = new Node, nodeChildR = new Node;
        root.child = [nodeChildL, nodeChildR];
        createNodeChild(nodeChildL, int);
        createNodeChild(nodeChildR, int);
    }
}

// 创建根节点
const root = new Node;
// 创建最多5层额
let level = 3 + Math.floor(Math.random() * 3);
// const level = 4;
createNodeChild(root, level);

console.log('初始化完成, 二叉树共生产了', level, '层');
console.log('你可以通过在控制台打印 root 来查看二叉树信息 =>', root);
console.log('你的解法可以通过 run(你写的函数) 来校验最终结果');
console.log('比如我的算法函数是 algorithmMy, 执行 run(algorithmMy) 即可得到结果');
// 我的解法1
function algorithmMy(node) {
    let nodeChildList = [];
    let list = [];
    let node1 = void 0;
    // 主要获取所有二叉树最终节点
    function getNodeNumber(node) {
        const {child} = node;
        if (child) {
            getNodeNumber(child[0]);
            getNodeNumber(child[1]);
        } else {
            nodeChildList.push(node);
        }
    }

    function get1Node(node) {
        const nodeRe = node.fn();
        const {child} = node;
        if (!child) {
            node1 = node;
        } else {
            get1Node(child[nodeRe > 0 ? 0 : 1]);
        }
    }

    getNodeNumber(node);
    get1Node(node);

    for(let i = nodeChildList.length - 1; i >= 0; i --) {
        if(nodeChildList[i] === node1) {
            list.push(1);
            if(list.length < nodeChildList.length) {
                list.push(0);
            }
            break;
        } else {
            list.push(0);
        }
    }

    list.reverse();
    return list;
}

function initRoot(root) {
    root.child = null;
    level = 3 + Math.floor(Math.random() * 3);
    createNodeChild(root, level);
}

function run(fn) {
    // 验证算法 验证3次, 保证验证正确性
    console.log('正在验证算法');
    for(let i = 3; i >= 0; i --) {
        var list = fn(root);
        var thisList = algorithmMy(root);
        
        // 验证长度
        if (list.length === thisList.length) {
            // 验证内容
            for (let j = list.length - 1; j >= 0; j --) {
                if (list[j] !== thisList[j]) {
                    return setError(list, thisList);
                    break;
                }
            }
        } else {
            return setError(list, thisList);
        }

        // 重置二叉树
        initRoot(root);
    }
    
    console.log('验证成功！二叉树充值');
}

function setError(list, thisList) {
    console.log('你的结果 =>', list);
    console.log('实际结果 =>', thisList);
    console.log('算法验证失败, 二叉树重置');
}